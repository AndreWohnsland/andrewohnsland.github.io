const cors = require('cors');

function initCors(app) {
  const whitelist = ['http://localhost:3000', 'https://andrewohnsland.github.io'];
  const corsOptions = {
    origin(origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
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
