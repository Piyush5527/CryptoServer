function errorHandler(err, req, res, next) {
  // console.error("ERROR",err.stack);
  // res.status(500).json({ message: err.message || "Internal Server Error" });

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    error: message,
    status: statusCode,
  });
}

export default errorHandler;
