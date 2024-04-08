const CustomErrors = require('../errors');
const jwt = require('jsonwebtoken');

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader|| !authHeader.startsWith('Bearer ')) {
    throw new CustomErrors.BadRequestError('No token provided', 400);
  }

  try {
    const token = authHeader.split(' ')[1];
    const { id, name, email } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id, name, email };
    return next();
  } catch (error) {
    throw new CustomErrors.UnauthenticatedError('Invalid token');
  }
};

module.exports = authenticationMiddleware;