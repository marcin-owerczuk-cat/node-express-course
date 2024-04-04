const errorHandlerMiddleware = (err, req, res, next) => {
  res.status(500).json({error: err.message, message: 'Something went wrong'});
}

module.exports = errorHandlerMiddleware;