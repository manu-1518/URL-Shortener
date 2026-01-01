module.exports = (err, req, res, next) => {
  console.error("🔥 REAL ERROR:");
  console.error(err);

  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
};
