const compiler = {};

compiler.sendResponse = (res, status, result, type = "json") => {
  switch (type) {
    case "json":
      return res.status(status).json(result);
    case "view":
      return res.status(status).send(result);
    default:
      return res.status(status).json(result);
  }
};

compiler.sendError = (res, error) => {
  // console.error({ details: error.stack });
  return res.status(error.status || 404).json({
    type: error.type || "unknown",
    payload: error.payload || error.message,
  });
};

module.exports = compiler;
