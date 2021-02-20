const connectDB = require("./db");
const { products } = require("./data");
const { auth } = require("./middlewares");

module.exports = { 
    connectDB,
    products,
    auth
};