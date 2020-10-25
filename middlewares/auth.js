const jwt = require('jsonwebtoken');
const { AppError } = require('./errorHandler');
const User = require('../models/user.model');

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies['jwt'];
    const tokenDetails = jwt.verify(token, process.env.JWT_SECRET);
    const foundUser = await User.findById(tokenDetails.id);
    if (foundUser === null) {
      res.cookie('jwt', '', { httpOnly: true, maxAge: 0 }); //, sameSite: 'lax'
      return next(new AppError('Invalid token data', 401));
    }
    next();
  } catch (error) {
    next(new AppError('Authentication failed', 401));
  }
};
