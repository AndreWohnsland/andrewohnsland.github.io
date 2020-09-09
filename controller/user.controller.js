let User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { AppError } = require('../middlewares/errorHandler');

async function addUser(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  const newUser = User({ username, password });
  newUser
    .save()
    .then(() => res.json('User added!'))
    .catch((err) => next(new AppError('Error: ' + err, 400)));
}

async function login(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  User.login(username, password)
    .then((user) => {
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAgeInSeconds * 1000, sameSite: 'lax' });
      res.status(200).json('Login successful!');
    })
    .catch((err) => next(new AppError('Error: ' + err, 400)));
}

async function getAuth(req, res, next) {
  res.status(200).json('Authentication suceeded');
}

const maxAgeInSeconds = 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAgeInSeconds,
  });
};

module.exports = { addUser, login, getAuth };
