const cors = require('cors');
const pino = require('pino');

const logger = pino({ level: process.env.LOG_LEVEL || 'info', prettyPrint: true });

let whitelist = [];
if (process.env.WHITELIST !== undefined) {
  whitelist = process.env.WHITELIST.split(' ');
}
const isDev = process.env.ENVIRONMENT_TYPE === 'dev';
if (isDev) {
  whitelist.push('http://localhost:3000');
}

function initCors(app) {
  const corsOptions = {
    origin(origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        logger.warn(`Not authorized acces from: ${origin}`);
        callback(new Error(`${origin}: Not allowed by CORS`));
      }
    },
    methods: 'GET,HEAD,POST,PATCH,DELETE,OPTIONS',
    credentials: true, // required to pass
    allowedHeaders: 'Content-Type,Authorization,X-Requested-With',
    exposedHeaders: ['set-cookie'],
  };
  app.use(cors(corsOptions));
}

module.exports = { initCors };
