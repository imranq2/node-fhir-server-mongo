const env = require('var');
const Sentry = require('./middleware/sentry');
const {profiles} = require('./profiles');

console.log(`MONGO_URL=${env.MONGO_URL}`);

console.log(
  'Waiting for MongoDB connection: ' + env.MONGO_URL ||
    `mongodb://${env.MONGO_HOSTNAME}:${env.MONGO_PORT}`
);

console.log(`MONGO_DB=${env.MONGO_DB_NAME}`);
console.log(`MONGO_USERNAME=${env.MONGO_USERNAME}`);
console.log(`MONGO_PASSWORD=${env.MONGO_PASSWORD}`);

let mongoUrl = env.MONGO_URL || `mongodb://${env.MONGO_HOSTNAME}:${env.MONGO_PORT}`;
console.log('Waiting for MongoDB connection: ' + mongoUrl);
if (env.MONGO_USERNAME !== undefined) {
  mongoUrl = mongoUrl.replace('mongodb://', `mongodb://${env.MONGO_USERNAME}:${env.MONGO_PASSWORD}@`);
  // console.log('Waiting for MongoDB connection with username/password: ' + mongoUrl);
}
// url-encode the url
mongoUrl = encodeURI(mongoUrl);
// console.log('Waiting for URL encoded MongoDB connection: ' + mongoUrl);
/**
 * @name mongoConfig
 * @summary Configurations for our Mongo instance
 */
let mongoConfig = {
  connection: mongoUrl,
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
  errorTracking: {
    requestHandler: Sentry.Handlers.requestHandler,
    errorHandler: Sentry.Handlers.errorHandler,
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
  profiles: profiles,
};

module.exports = {
  fhirServerConfig,
  mongoConfig,
};
