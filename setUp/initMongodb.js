const mongoose = require('mongoose');
const User = require('../models/user.model');

function initMongodb() {
  const uri = process.env.ATLAS_URI;
  mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(async () => {
    const existingUser = await User.find();
    if (existingUser.length === 0) {
      console.log('No user exists, generating default user ...');
      const newUser = User({ username: 'admin', password: 'adminadmin' });
      await newUser
        .save()
        .then(
          console.los('User "admin" with password "adminadmin" was generated. Please keep in mind changing creds.')
        );
    }
  });
  const connection = mongoose.connection;
  connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
  });
}

module.exports = { initMongodb };
