import mongoose from 'mongoose';
import pino from 'pino';
import User from '../models/user.model';

const logger = pino({ level: process.env.LOG_LEVEL || 'info', prettyPrint: true });
const username = process.env.ADMIN_USER || 'admin';
const password = process.env.ADMIN_PASSWORD || 'adminadmin';

function initMongodb() {
  const uri = process.env.ATLAS_URI || 'mongodb://127.0.0.1:27017';
  mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(async () => {
    const existingUser = await User.find();
    if (existingUser.length === 0) {
      logger.info('No user exists, generating default user ...');
      const newUser = new User({ username, password });
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

export { initMongodb };
