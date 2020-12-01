/* eslint-disable no-unused-vars */
const { MongoClient } = require('mongodb');
const supertest = require('supertest');

const { app } = require('../../app');
const globals = require('../../globals');
const { CLIENT, CLIENT_DB } = require('../../constants');
const practitionerResource = require('./fixtures/providers/practitioner.json');
const locationResource = require('./fixtures/providers/location.json');
const practitionerRoleResource = require('./fixtures/providers/practitioner_role.json');
const expectedPractitionerResource = require('./fixtures/providers/expected_practitioner.json');
const async = require('async');

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
  });

  afterEach(async () => {
    await db.dropDatabase();
    await connection.close();
  });

  describe('Practitioner Merges', () => {
    test('Multiple calls to Practitioner merge properly', (done) => {
      async.waterfall([
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
            .send(practitionerResource)
            .set('Content-Type', 'application/fhir+json')
            .set('Accept', 'application/fhir+json')
            .expect(200, (err, resp) => {
              console.log('------- response 2 ------------');
              console.log(JSON.stringify(resp.body, null, 2));
              console.log('------- end response 2  ------------');
              return cb(err, resp);
            }),
        (results, cb) =>
          request
            .post('/4_0_0/Practitioner/4657/$merge')
            .send(practitionerResource)
            .set('Content-Type', 'application/fhir+json')
            .set('Accept', 'application/fhir+json')
            .expect(200, (err, resp) => {
              if (!err) {
                console.log('------- response 3 ------------');
                console.log(JSON.stringify(resp.body, null, 2));
                console.log('------- end response 3  ------------');
              }
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
            expect(body.length).toBe(1);
            delete body[0]['meta']['lastUpdated'];
            let expected = expectedPractitionerResource;
            delete expected[0]['meta']['lastUpdated'];
            expected[0]['meta']['versionId'] = '1';
            expect(body).toStrictEqual(expected);
            console.log('------- response 5 ------------');
            console.log(JSON.stringify(resp.body, null, 2));
            console.log('------- end response 5  ------------');
          }, cb),
      ],
        (err, results) => {
          if (!err) { console.log('done'); }

          if (err) { console.error(err); done.fail(err); }
          done();
        });
    });
  });
});
