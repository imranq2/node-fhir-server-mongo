/* eslint-disable no-unused-vars */
const {MongoClient} = require('mongodb');
const supertest = require('supertest');

const {app} = require('../../../app');
const globals = require('../../../globals');
const {CLIENT, CLIENT_DB} = require('../../../constants');
const practitionerBundleResource = require('./fixtures/providers/practitioner_bundle.json');
const expectedPractitionerBundleResource = require('./fixtures/providers/expected_practitioner_bundle.json');
const async = require('async');
const env = require('var');

const request = supertest(app);

describe('Practitioner Merge Tests', () => {
    let connection;
    let db;
    // let resourceId;

    beforeEach(async () => {
        connection = await MongoClient.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = await connection.db();

        globals.set(CLIENT, connection);
        globals.set(CLIENT_DB, db);
                jest.setTimeout(30000);
        env['VALIDATE_SCHEMA'] = true;
    });

    afterEach(async () => {
        await db.dropDatabase();
        await connection.close();
    });

    describe('Practitioner Merge Bundles', () => {
        test('Multiple calls to Practitioner merge bundles properly', async (done) => {
            await async.waterfall([
                    (cb) => // first confirm there are no practitioners
                        request
                            .get('/4_0_0/Practitioner')
                            .set('Content-Type', 'application/fhir+json')
                            .set('Accept', 'application/fhir+json')
                            .expect(200, (err, resp) => {
                                expect(resp.body.length).toBe(0);
                                console.log('------- response 1 ------------');
                                console.log(JSON.stringify(resp.body, null, 2));
                                console.log('------- end response 1 ------------');
                                return cb(err, resp);
                            }),
                    (results, cb) =>
                        request
                            .post('/4_0_0/Practitioner/4657/$merge')
                            .send(practitionerBundleResource)
                            .set('Content-Type', 'application/fhir+json')
                            .set('Accept', 'application/fhir+json')
                            .expect(200, (err, resp) => {
                                console.log('------- response 2 ------------');
                                console.log(JSON.stringify(resp.body, null, 2));
                                console.log('------- end response 2  ------------');
                                return cb(err, resp);
                            }),
                    (results, cb) => request
                        .get('/4_0_0/Practitioner')
                        .set('Content-Type', 'application/fhir+json')
                        .set('Accept', 'application/fhir+json')
                        .expect(200, cb)
                        .expect((resp) => {
                            // clear out the lastUpdated column since that changes
                            let body = resp.body;
                            console.log('------- response 5 ------------');
                            console.log(JSON.stringify(resp.body, null, 2));
                            console.log('------- end response 5  ------------');
                            expect(body.length).toBe(2);
                            body.forEach(element => {
                                delete element['meta']['lastUpdated'];
                            });
                            let expected = expectedPractitionerBundleResource;
                            expected.forEach(element => {
                                if ('meta' in element) {
                                    delete element['meta']['lastUpdated'];
                                }
                                element['meta'] = {'versionId': '1'};
                                if ('$schema' in element) {
                                    delete element['$schema'];
                                }
                            });
                            expect(body).toStrictEqual(expected);
                        }, cb),
                ],
                (err, results) => {
                    if (!err) {
                        console.log('done');
                    }

                    if (err) {
                        console.error(err);
                        done.fail(err);
                    }
                    done();
                });
        });
    });
});
