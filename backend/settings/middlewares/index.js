const { auth, admin } = require("./authMiddleware");
const { notFound, errorHandler } = require("./errorHandlingMiddlewares");

module.exports = {
    auth, admin,
    notFound, errorHandler
};