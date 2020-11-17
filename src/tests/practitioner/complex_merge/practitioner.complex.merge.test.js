/* eslint-disable no-unused-vars */
const { MongoClient } = require('mongodb');
const supertest = require('supertest');

const { app } = require('../../../app');
const globals = require('../../../globals');
const { CLIENT, CLIENT_DB } = require('../../../constants');
// provider file
const practitionerResource = require('./fixtures/providers/practitioner.json');
const locationResource = require('./fixtures/providers/location.json');
const practitionerRoleResource = require('./fixtures/providers/practitioner_role.json');
// insurance
const insurancePractitionerResource = require('./fixtures/insurance/practitioner.json');
const insuranceOrganizationResource = require('./fixtures/insurance/insurance_organization.json');
const insurancePlanLocationResource = require('./fixtures/insurance/insurance_plan_location.json');
const insurancePlanResource = require('./fixtures/insurance/insurance_plan.json');
const insurancePractitionerRoleResource = require('./fixtures/insurance/practitioner_role.json');
const insuranceProviderOrganizationResource = require('./fixtures/insurance/provider_organization.json');
// scheduler
const schedulerPractitionerRoleResource = require('./fixtures/scheduler/practitioner_role.json');
// expected
const expectedPractitionerResource = require('./fixtures/expected/expected_practitioner.json');
const expectedPractitionerRoleResource = require('./fixtures/expected/expected_practitioner_role.json');
const expectedLocationResource = require('./fixtures/expected/expected_location.json');
const async = require('async');

const request = supertest(app);

describe('Practitioner Complex Merge Tests', () => {
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
            .post('/4_0_0/Practitioner/1679033641/$merge')
            .send(practitionerResource)
            .set('Content-Type', 'application/fhir+json')
            .set('Accept', 'application/fhir+json')
            .expect(200, (err, resp) => {
              console.log('------- response practitionerResource ------------');
              console.log(JSON.stringify(resp.body, null, 2));
              console.log('------- end response  ------------');
              expect(resp.body['created']).toBe(true);
              return cb(err, resp);
            }),
        (results, cb) =>
          request
            .post('/4_0_0/Location/UF3-UADM/$merge')
            .send(locationResource)
            .set('Content-Type', 'application/fhir+json')
            .set('Accept', 'application/fhir+json')
            .expect(200, (err, resp) => {
              console.log('------- response 3 ------------');
              console.log(JSON.stringify(resp.body, null, 2));
              console.log('------- end response 3  ------------');
              expect(resp.body['created']).toBe(true);
              return cb(err, resp);
            }), (results, cb) =>
          request
            .post('/4_0_0/PractitionerRole/4657-3437/$merge')
            .send(practitionerRoleResource)
            .set('Content-Type', 'application/fhir+json')
            .set('Accept', 'application/fhir+json')
            .expect(200, (err, resp) => {
              console.log('------- response locationResource ------------');
              console.log(JSON.stringify(resp.body, null, 2));
              console.log('------- end response  ------------');
              expect(resp.body['created']).toBe(true);
              return cb(err, resp);
            }), (results, cb) =>
          request
            .post('/4_0_0/Organization/AETNA/$merge')
            .send(insuranceOrganizationResource)
            .set('Content-Type', 'application/fhir+json')
            .set('Accept', 'application/fhir+json')
            .expect(200, (err, resp) => {
              console.log('------- response insuranceOrganizationResource ------------');
              console.log(JSON.stringify(resp.body, null, 2));
              console.log('------- end response  ------------');
              expect(resp.body['created']).toBe(true);
              return cb(err, resp);
            }), (results, cb) =>
          request
            .post('/4_0_0/Location/AetnaElectChoice/$merge')
            .send(insurancePlanLocationResource)
            .set('Content-Type', 'application/fhir+json')
            .set('Accept', 'application/fhir+json')
            .expect(200, (err, resp) => {
              console.log('------- response insurancePlanLocationResource ------------');
              console.log(JSON.stringify(resp.body, null, 2));
              console.log('------- end response  ------------');
              expect(resp.body['created']).toBe(true);
              return cb(err, resp);
            }), (results, cb) =>
          request
            .post('/4_0_0/InsurancePlan/AETNA-AetnaElectChoice/$merge')
            .send(insurancePlanResource)
            .set('Content-Type', 'application/fhir+json')
            .set('Accept', 'application/fhir+json')
            .expect(200, (err, resp) => {
              console.log('------- response insurancePlanResource ------------');
              console.log(JSON.stringify(resp.body, null, 2));
              console.log('------- end response  ------------');
              expect(resp.body['created']).toBe(true);
              return cb(err, resp);
            }), (results, cb) =>
          request
            .post('/4_0_0/Practitioner/1679033641/$merge')
            .send(insurancePractitionerResource)
            .set('Content-Type', 'application/fhir+json')
            .set('Accept', 'application/fhir+json')
            .expect(200, (err, resp) => {
              console.log('------- response insurancePractitionerResource ------------');
              console.log(JSON.stringify(resp.body, null, 2));
              console.log('------- end response  ------------');
              expect(resp.body['created']).toBe(false);
              return cb(err, resp);
            }), (results, cb) =>
          request
            .post('/4_0_0/PractitionerRole/1679033641-AETNA-AetnaElectChoiceEPO/$merge')
            .send(insurancePractitionerRoleResource)
            .set('Content-Type', 'application/fhir+json')
            .set('Accept', 'application/fhir+json')
            .expect(200, (err, resp) => {
              console.log('------- response insurancePractitionerRoleResource ------------');
              console.log(JSON.stringify(resp.body, null, 2));
              console.log('------- end response  ------------');
              expect(resp.body['created']).toBe(true);
              return cb(err, resp);
            }), (results, cb) =>
          request
            .post('/4_0_0/Organization/MWHC/$merge')
            .send(insuranceProviderOrganizationResource)
            .set('Content-Type', 'application/fhir+json')
            .set('Accept', 'application/fhir+json')
            .expect(200, (err, resp) => {
              console.log('------- response insuranceProviderOrganizationResource ------------');
              console.log(JSON.stringify(resp.body, null, 2));
              console.log('------- end response  ------------');
              expect(resp.body['created']).toBe(true);
              return cb(err, resp);
            }), (results, cb) =>
          request
            .post('/4_0_0/PractitionerRole/1679033641/$merge')
            .send(schedulerPractitionerRoleResource)
            .set('Content-Type', 'application/fhir+json')
            .set('Accept', 'application/fhir+json')
            .expect(200, (err, resp) => {
              console.log('------- response schedulerPractitionerRoleResource ------------');
              console.log(JSON.stringify(resp.body, null, 2));
              console.log('------- end response  ------------');
              expect(resp.body['created']).toBe(true);
              return cb(err, resp);
            }),
        (results, cb) => request
          .get('/4_0_0/Practitioner')
          .set('Content-Type', 'application/fhir+json')
          .set('Accept', 'application/fhir+json')
          .expect(200, cb)
          .expect((resp) => {
            console.log('------- response Practitioner ------------');
            console.log(JSON.stringify(resp.body, null, 2));
            console.log('------- end response  ------------');
            // clear out the lastUpdated column since that changes
            let body = resp.body;
            expect(body.length).toBe(1);
            delete body[0]['meta']['lastUpdated'];
            let expected = expectedPractitionerResource;
            // delete expected[0]['meta']['lastUpdated'];
            expected[0]['meta'] = { 'versionId': '2' };
            expect(body).toStrictEqual(expected);
          }, cb),
        (results, cb) => request
          .get('/4_0_0/PractitionerRole')
          .set('Content-Type', 'application/fhir+json')
          .set('Accept', 'application/fhir+json')
          .expect(200, cb)
          .expect((resp) => {
            console.log('------- response PractitionerRole ------------');
            console.log(JSON.stringify(resp.body, null, 2));
            console.log('------- end response  ------------');
            // clear out the lastUpdated column since that changes
            let body = resp.body;
            expect(body.length).toBe(3);
            delete body[0]['meta']['lastUpdated'];
            body.forEach(element => {
              delete element['meta']['lastUpdated'];
            });
            let expected = expectedPractitionerRoleResource;
            expected.forEach(element => {
              delete element['meta']['lastUpdated'];
              element['meta'] = { 'versionId': '1' };
            });

            expect(body).toStrictEqual(expected);
          }, cb),
        (results, cb) => request
          .get('/4_0_0/Location')
          .set('Content-Type', 'application/fhir+json')
          .set('Accept', 'application/fhir+json')
          .expect(200, cb)
          .expect((resp) => {
            console.log('------- response Location ------------');
            console.log(JSON.stringify(resp.body, null, 2));
            console.log('------- end response  ------------');
            // clear out the lastUpdated column since that changes
            let body = resp.body;
            expect(body.length).toBe(2);
            delete body[0]['meta']['lastUpdated'];
            body.forEach(element => {
              delete element['meta']['lastUpdated'];
            });
            let expected = expectedLocationResource;
            expected.forEach(element => {
              delete element['meta']['lastUpdated'];
              element['meta'] = { 'versionId': '1' };
            });

            expect(body).toStrictEqual(expected);
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
