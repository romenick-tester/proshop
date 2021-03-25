const connectDB = require("./db");
const { products } = require("./data");
const { auth, admin, notFound, errorHandler } = require("./middlewares");
const { users, products: productsData } = require("./seeders");
const { User, Product, Order } = require("./models");

module.exports = {
    connectDB,
    products,
    auth, admin, notFound, errorHandler,
    users, productsData,
    User, Product, Order
};