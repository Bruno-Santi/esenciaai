const compiler = {};

compiler.sendResponse = (res, status, result) => {
  return res.status(status || 200).json(result);
};

compiler.sendError = (res, error) => {
  console.error({ details: error.stack });
  return res.status(error.status || 404).json({
    type: error.type || "unknown",
    payload: error.payload || error.message
  });
};

module.exports = compiler;
