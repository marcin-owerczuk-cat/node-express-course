const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");
const {UnauthorizedError} = require("../errors");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader|| !authHeader.startsWith('Bearer ')) {
    throw new CustomAPIError('No token provided', 400);
  }

  try {
    const { id, username } = jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET);
    req.user = { id, username };
    next();
  } catch (err) {
    throw new UnauthorizedError('Not authorized to access this route');
  }

}

module.exports = authenticationMiddleware;