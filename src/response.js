const response = (statusCode, data, message, res) => {
  res.status(statusCode).json({
    statusCode: statusCode,
    payload: data,
    message,
    metadata: {
      prev: "",
      next: "",
      current: "",
    },
  });
};

module.exports = response;
