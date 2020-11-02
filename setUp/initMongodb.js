const mongoose = require('mongoose');
const pino = require('pino');
const User = require('../models/user.model');

const logger = pino({ level: process.env.LOG_LEVEL || 'info', prettyPrint: true });
const username = 'admin';
const password = 'adminadmin';

function initMongodb() {
  const uri = process.env.ATLAS_URI;
  mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(async () => {
    const existingUser = await User.find();
    if (existingUser.length === 0) {
      logger.info('No user exists, generating default user ...');
      const newUser = User({ username, password });
      await newUser.save().then(() => {
        logger.info('User "admin" with password "adminadmin" was generated. Please keep in mind changing creds.');
      });
    }
  });
  const { connection } = mongoose;
  connection.once('open', () => {
    logger.info('MongoDB database connection established successfully');
  });
}

module.exports = { initMongodb };
