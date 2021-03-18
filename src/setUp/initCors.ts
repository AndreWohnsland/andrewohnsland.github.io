import cors from 'cors';
import pino from 'pino';

const logger = pino({ level: process.env.LOG_LEVEL || 'info', prettyPrint: true });

let whitelist: string[] = [];
if (process.env.WHITELIST !== undefined) {
  whitelist = process.env.WHITELIST.split(' ');
}
const isDev = process.env.ENVIRONMENT_TYPE === 'dev';
if (isDev) {
  whitelist.push('http://localhost:3000');
}

function createCorsOption(): cors.CorsOptions {
  const corsOptions = {
    // type CustomOrigin = (requestOrigin: string | undefined, callback: (err: Error | null, origin?: StaticOrigin | undefined) => void) => void
    origin: function (origin: string | undefined, callback: (err: Error | null, origin?: boolean | undefined) => void) {
      if (whitelist && whitelist.indexOf(origin as string) !== -1) {
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
  return corsOptions;
}

export { createCorsOption };
