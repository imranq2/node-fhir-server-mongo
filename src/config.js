const { VERSIONS } = require('@asymmetrik/node-fhir-server-core').constants;
const env = require('var');
// const waitForMongo = require('wait-for-mongo');

console.log(`MONGO_URL=${env.MONGO_URL}`);
console.log(`MONGO_DB=${env.MONGO_DB_NAME}`);
console.log(`MONGO_USERNAME=${env.MONGO_USERNAME}`);
console.log(`MONGO_PASSWORD=${env.MONGO_PASSWORD}`);
// waitForMongo(env.MONGO_URL || `mongodb://${env.MONGO_HOSTNAME}:${env.MONGO_PORT}`, { timeout: 1000 * 60 * 2 }, function (err) {
//   if (err) {
//     console.log('timeout exceeded');
//   } else {
//     console.log('mongodb comes online');
//   }
// });
const mongoUrl = env.MONGO_URL || `mongodb://${env.MONGO_HOSTNAME}:${env.MONGO_PORT}`;
console.log('Waiting for MongoDB connection: ' + mongoUrl);
const mongoUrlWithUserNameAndPassword = mongoUrl.replace('mongodb://', `mongodb://${env.MONGO_USERNAME}:${env.MONGO_PASSWORD}@`);
console.log('Waiting for MongoDB connection: ' + mongoUrlWithUserNameAndPassword);

/**
 * @name mongoConfig
 * @summary Configurations for our Mongo instance
 */
let mongoConfig = {
  connection: mongoUrlWithUserNameAndPassword,
  db_name: env.MONGO_DB_NAME,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auto_reconnect: true,
    keepAlive: 1,
    connectTimeoutMS: 60000,
    socketTimeoutMS: 60000,
  },
};

// Set up whitelist
let whitelist_env = (env.WHITELIST && env.WHITELIST.split(',').map((host) => host.trim())) || false;

// If no whitelist is present, disable cors
// If it's length is 1, set it to a string, so * works
// If there are multiple, keep them as an array
let whitelist = whitelist_env && whitelist_env.length === 1 ? whitelist_env[0] : whitelist_env;

/**
 * @name fhirServerConfig
 * @summary @asymmetrik/node-fhir-server-core configurations.
 */
let fhirServerConfig = {
  auth: {
    // This servers URI
    resourceServer: env.RESOURCE_SERVER,
    //
    // if you use this strategy, you need to add the corresponding env vars to docker-compose
    //
    // strategy: {
    // 	name: 'bearer',
    // 	useSession: false,
    // 	service: './src/strategies/bearer.strategy.js'
    // },
  },
  server: {
    // support various ENV that uses PORT vs SERVER_PORT
    port: env.PORT || env.SERVER_PORT,
    // allow Access-Control-Allow-Origin
    corsOptions: {
      maxAge: 86400,
      origin: whitelist,
    },
  },
  logging: {
    level: env.LOGGING_LEVEL,
  },
  //
  // If you want to set up conformance statement with security enabled
  // Uncomment the following block
  //
  security: [
    {
      url: 'authorize',
      valueUri: `${env.AUTH_SERVER_URI}/authorize`,
    },
    {
      url: 'token',
      valueUri: `${env.AUTH_SERVER_URI}/token`,
    },
    // optional - registration
  ],
  //
  // Add any profiles you want to support.  Each profile can support multiple versions
  // if supported by core.  To support multiple versions, just add the versions to the array.
  //
  // Example:
  // Account: {
  //		service: './src/services/account/account.service.js',
  //		versions: [ VERSIONS['4_0_0'], VERSIONS['3_0_1'], VERSIONS['1_0_2'] ]
  // },
  //
  profiles: {
    Account: {
      service: './src/services/account/account.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    ActivityDefinition: {
      service: './src/services/activitydefinition/activitydefinition.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    AdverseEvent: {
      service: './src/services/adverseevent/adverseevent.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    AllergyIntolerance: {
      service: './src/services/allergyintolerance/allergyintolerance.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    Appointment: {
      service: './src/services/appointment/appointment.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    AppointmentResponse: {
      service: './src/services/appointmentresponse/appointmentresponse.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    AuditEvent: {
      service: './src/services/auditevent/auditevent.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    Basic: {
      service: './src/services/basic/basic.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    Binary: {
      service: './src/services/binary/binary.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    BodyStructure: {
      service: './src/services/bodystructure/bodystructure.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    Bundle: {
      service: './src/services/bundle/bundle.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    CapabilityStatement: {
      service: './src/services/capabilitystatement/capabilitystatement.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    CarePlan: {
      service: './src/services/careplan/careplan.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    CareTeam: {
      service: './src/services/careteam/careteam.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    ChargeItem: {
      service: './src/services/chargeitem/chargeitem.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    ChargeItemDefinition: {
      service: './src/services/chargeitemdefinition/chargeitemdefinition.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    Claim: {
      service: './src/services/claim/claim.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    ClaimResponse: {
      service: './src/services/claimresponse/claimresponse.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    ClinicalImpression: {
      service: './src/services/clinicalimpression/clinicalimpression.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    CodeSystem: {
      service: './src/services/codesystem/codesystem.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    Communication: {
      service: './src/services/communication/communication.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    CommunicationRequest: {
      service: './src/services/communicationrequest/communicationrequest.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    CompartmentDefinition: {
      service: './src/services/compartmentdefinition/compartmentdefinition.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    Composition: {
      service: './src/services/composition/composition.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    ConceptMap: {
      service: './src/services/conceptmap/conceptmap.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    Condition: {
      service: './src/services/condition/condition.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    Consent: {
      service: './src/services/consent/consent.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    Contract: {
      service: './src/services/contract/contract.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    Coverage: {
      service: './src/services/coverage/coverage.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    CoverageEligibilityRequest: {
      service: './src/services/coverageeligibilityrequest/coverageeligibilityrequest.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    CoverageEligibilityResponse: {
      service: './src/services/coverageeligibilityresponse/coverageeligibilityresponse.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    DetectedIssue: {
      service: './src/services/detectedissue/detectedissue.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    Device: {
      service: './src/services/device/device.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    DeviceDefinition: {
      service: './src/services/devicedefinition/devicedefinition.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    DeviceMetric: {
      service: './src/services/devicemetric/devicemetric.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    DeviceRequest: {
      service: './src/services/devicerequest/devicerequest.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    DeviceUseStatement: {
      service: './src/services/deviceusestatement/deviceusestatement.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    DiagnosticReport: {
      service: './src/services/diagnosticreport/diagnosticreport.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    DocumentManifest: {
      service: './src/services/documentmanifest/documentmanifest.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    DocumentReference: {
      service: './src/services/documentreference/documentreference.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    EffectEvidenceSynthesis: {
      service: './src/services/effectevidencesynthesis/effectevidencesynthesis.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    Encounter: {
      service: './src/services/encounter/encounter.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    Endpoint: {
      service: './src/services/endpoint/endpoint.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    EnrollmentRequest: {
      service: './src/services/enrollmentrequest/enrollmentrequest.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    EnrollmentResponse: {
      service: './src/services/enrollmentresponse/enrollmentresponse.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    EpisodeOfCare: {
      service: './src/services/episodeofcare/episodeofcare.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    EventDefinition: {
      service: './src/services/eventdefinition/eventdefinition.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    ExampleScenario: {
      service: './src/services/examplescenario/examplescenario.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    ExplanationOfBenefit: {
      service: './src/services/explanationofbenefit/explanationofbenefit.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    FamilyMemberHistory: {
      service: './src/services/familymemberhistory/familymemberhistory.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    Flag: {
      service: './src/services/flag/flag.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    Goal: {
      service: './src/services/goal/goal.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    GraphDefinition: {
      service: './src/services/graphdefinition/graphdefinition.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    Group: {
      service: './src/services/group/group.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    GuidanceResponse: {
      service: './src/services/guidanceresponse/guidanceresponse.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    HealthcareService: {
      service: './src/services/healthcareservice/healthcareservice.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    ImagingStudy: {
      service: './src/services/imagingstudy/imagingstudy.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    Immunization: {
      service: './src/services/immunization/immunization.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    ImmunizationEvaluation: {
      service: './src/services/immunizationevaluation/immunizationevaluation.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    ImmunizationRecommendation: {
      service: './src/services/immunizationrecommendation/immunizationrecommendation.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    ImplementationGuide: {
      service: './src/services/implementationguide/implementationguide.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    InsurancePlan: {
      service: './src/services/insuranceplan/insuranceplan.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    Invoice: {
      service: './src/services/invoice/invoice.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    Library: {
      service: './src/services/library/library.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    Linkage: {
      service: './src/services/linkage/linkage.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    List: {
      service: './src/services/list/list.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    Location: {
      service: './src/services/location/location.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    Measure: {
      service: './src/services/measure/measure.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    MeasureReport: {
      service: './src/services/measurereport/measurereport.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    Media: {
      service: './src/services/media/media.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    Medication: {
      service: './src/services/medication/medication.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    MedicationAdministration: {
      service: './src/services/medicationadministration/medicationadministration.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    MedicationDispense: {
      service: './src/services/medicationdispense/medicationdispense.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    MedicationKnowledge: {
      service: './src/services/medicationknowledge/medicationknowledge.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    MedicationRequest: {
      service: './src/services/medicationrequest/medicationrequest.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    MedicationStatement: {
      service: './src/services/medicationstatement/medicationstatement.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    MedicinalProduct: {
      service: './src/services/medicinalproduct/medicinalproduct.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    MedicinalProductAuthorization: {
      service: './src/services/medicinalproductauthorization/medicinalproductauthorization.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    MedicinalProductContraindication: {
      service: './src/services/medicinalproductcontraindication/medicinalproductcontraindication.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    MedicinalProductIndication: {
      service: './src/services/medicinalproductindication/medicinalproductindication.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    MedicinalProductPackaged: {
      service: './src/services/medicinalproductpackaged/medicinalproductpackaged.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    MedicinalProductPharmaceutical: {
      service: './src/services/medicinalproductpharmaceutical/medicinalproductpharmaceutical.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    MessageDefinition: {
      service: './src/services/messagedefinition/messagedefinition.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    MessageHeader: {
      service: './src/services/messageheader/messageheader.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    MolecularSequence: {
      service: './src/services/molecularsequence/molecularsequence.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    NamingSystem: {
      service: './src/services/namingsystem/namingsystem.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    NutritionOrder: {
      service: './src/services/nutritionorder/nutritionorder.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    Observation: {
      service: './src/services/observation/observation.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    OperationDefinition: {
      service: './src/services/operationdefinition/operationdefinition.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    Organization: {
      service: './src/services/organization/organization.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    OrganizationAffiliation: {
      service: './src/services/organizationaffiliation/organizationaffiliation.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    Patient: {
      service: './src/services/patient/patient.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    PaymentNotice: {
      service: './src/services/paymentnotice/paymentnotice.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    PaymentReconciliation: {
      service: './src/services/paymentreconciliation/paymentreconciliation.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    Person: {
      service: './src/services/person/person.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    PlanDefinition: {
      service: './src/services/plandefinition/plandefinition.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    Practitioner: {
      service: './src/services/practitioner/practitioner.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    PractitionerRole: {
      service: './src/services/practitionerrole/practitionerrole.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    Procedure: {
      service: './src/services/procedure/procedure.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    Provenance: {
      service: './src/services/provenance/provenance.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    Questionnaire: {
      service: './src/services/questionnaire/questionnaire.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    QuestionnaireResponse: {
      service: './src/services/questionnaireresponse/questionnaireresponse.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    RelatedPerson: {
      service: './src/services/relatedperson/relatedperson.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    RequestGroup: {
      service: './src/services/requestgroup/requestgroup.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    ResearchDefinition: {
      service: './src/services/researchdefinition/researchdefinition.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    ResearchElementDefinition: {
      service: './src/services/researchelementdefinition/researchelementdefinition.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    ResearchStudy: {
      service: './src/services/researchstudy/researchstudy.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    ResearchSubject: {
      service: './src/services/researchsubject/researchsubject.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    RiskAssessment: {
      service: './src/services/riskassessment/riskassessment.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    RiskEvidenceSynthesis: {
      service: './src/services/riskevidencesynthesis/riskevidencesynthesis.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    Schedule: {
      service: './src/services/schedule/schedule.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    SearchParameter: {
      service: './src/services/searchparameter/searchparameter.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    ServiceRequest: {
      service: './src/services/servicerequest/servicerequest.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    Slot: {
      service: './src/services/slot/slot.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    Specimen: {
      service: './src/services/specimen/specimen.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    SpecimenDefinition: {
      service: './src/services/specimendefinition/specimendefinition.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    StructureDefinition: {
      service: './src/services/structuredefinition/structuredefinition.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    StructureMap: {
      service: './src/services/structuremap/structuremap.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    Subscription: {
      service: './src/services/subscription/subscription.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    Substance: {
      service: './src/services/substance/substance.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    SubstanceSpecification: {
      service: './src/services/substancespecification/substancespecification.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    SupplyDelivery: {
      service: './src/services/supplydelivery/supplydelivery.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    SupplyRequest: {
      service: './src/services/supplyrequest/supplyrequest.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    Task: {
      service: './src/services/task/task.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    TerminologyCapabilities: {
      service: './src/services/terminologycapabilities/terminologycapabilities.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    TestReport: {
      service: './src/services/testreport/testreport.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    TestScript: {
      service: './src/services/testscript/testscript.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    ValueSet: {
      service: './src/services/valueset/valueset.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    VerificationResult: {
      service: './src/services/verificationresult/verificationresult.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
    VisionPrescription: {
      service: './src/services/visionprescription/visionprescription.service.js',
      versions: [VERSIONS['4_0_0']],
      operation: [
        {
          name: 'everything',
          route: '/:id/$everything',
          method: 'GET',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
        {
          name: 'merge',
          route: '/:id/$merge',
          method: 'POST',
          reference: 'https://www.hl7.org/fhir/patient-operation-everything.html',
        },
      ],
    },
  },
};

module.exports = {
  fhirServerConfig,
  mongoConfig,
};
