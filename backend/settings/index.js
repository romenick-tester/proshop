const connectDB = require("./db");
const { products } = require("./data");
const { auth, notFound, errorHandler } = require("./middlewares");
const { users, products: productsData } = require("./seeders");
const { User, Product, Order } = require("./models");

module.exports = { 
    connectDB,
    products,
    auth, notFound, errorHandler,
    users, productsData,
    User, Product, Order
};