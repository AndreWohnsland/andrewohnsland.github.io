const jwt = require('jsonwebtoken');
const pino = require('pino');
const User = require('../models/user.model');
const { AppError } = require('../middlewares/errorHandler');

const logger = pino({ level: process.env.LOG_LEVEL || 'info', prettyPrint: true });

const maxAgeInSeconds = 24 * 60 * 60 * 7;

async function addUser(req, res, next) {
  const { username, password } = req.body;

  const newUser = User({ username, password });
  newUser
    .save()
    .then(() => {
      logger.info(`User ${username} was created`);
      res.json('User added!');
    })
    .catch((err) => next(new AppError(`Error: ${err}`, 400)));
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
      user.save().then(() => {
        logger.info(`Password for user ${username} was changed`);
        res.status(200).json('Password changed successfully');
      });
    })
    .catch((err) => {
      logger.warn(`Failure changing password for user ${username}`);
      next(new AppError(`${err}`, 400));
    });
}

const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: maxAgeInSeconds });

async function login(req, res, next) {
  const { username, password } = req.body;
  const isDev = process.env.ENVIRONMENT_TYPE === 'dev';
  const cookiePolicy = isDev ? { sameSite: 'lax' } : { sameSite: 'none', secure: true };

  User.login(username, password)
    .then((user) => {
      logger.info(`Login by user ${username}`);
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAgeInSeconds * 1000, ...cookiePolicy });
      res.status(200).json('Login successful!');
    })
    .catch((err) => {
      logger.warn(`Incorrect login for user ${username}`);
      next(new AppError(`${err}`, 400));
    });
}

async function getAuth(req, res) {
  res.status(200).json('Authentication suceeded');
}

module.exports = {
  addUser,
  login,
  getAuth,
  changePassword,
};
