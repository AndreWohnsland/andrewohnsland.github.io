const jwt = require('jsonwebtoken');
const { AppError } = require('./errorHandler');

module.exports = (req, res, next) => {
  try {
    const token = req.cookies['jwt'];
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    next(new AppError('Authentication failed', 401));
  }
};
