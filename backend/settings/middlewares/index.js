const auth = require("./authMiddleware");
const { notFound, errorHandler } = require("./errorHandlingMiddlewares");

module.exports = {
    auth,
    notFound, errorHandler
};