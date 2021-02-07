module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.status(500).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
