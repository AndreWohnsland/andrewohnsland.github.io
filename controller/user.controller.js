let User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { AppError } = require('../middlewares/errorHandler');

async function addUser(req, res, next) {
  const { username, password } = req.body;

  const newUser = User({ username, password });
  newUser
    .save()
    .then(() => res.json('User added!'))
    .catch((err) => next(new AppError('Error: ' + err, 400)));
}

async function changePassword(req, res, next) {
  const { username, password, newPassword, repeatedPassword } = req.body;
  if (newPassword.length < 8) {
    return next(new AppError('Password needs to have at least 8 letters', 400));
  }
  if (newPassword !== repeatedPassword) {
    return next(new AppError('The new and repeated password are not the same', 400));
  }
  User.login(username, password)
    .then((user) => {
      user.password = newPassword;
      user.save().then(res.status(200).json('Password changed successfully'));
    })
    .catch((err) => next(new AppError(`${err}`, 400)));
}

async function login(req, res, next) {
  const { username, password } = req.body;

  User.login(username, password)
    .then((user) => {
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAgeInSeconds * 1000, sameSite: 'none' }); //, sameSite: 'lax'
      res.status(200).json('Login successful!');
    })
    .catch((err) => next(new AppError(`${err}`, 400)));
}

async function getAuth(req, res, next) {
  res.status(200).json('Authentication suceeded');
}

const maxAgeInSeconds = 24 * 60 * 60 * 7;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAgeInSeconds,
  });
};

module.exports = { addUser, login, getAuth, changePassword };
