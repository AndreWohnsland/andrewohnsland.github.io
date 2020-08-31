const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Please enter a username'],
      unique: [true, 'This name already exists'],
      trim: true,
      minlength: [3, 'Must be at least 3 characters'],
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: [8, 'Must be at least 8 characters'],
    },
  },
  { timestamps: true }
);

// middleware to hash the PW
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
  }
  throw Error('Incorrect login data');
};

const User = mongoose.model('User', userSchema);

module.exports = User;
