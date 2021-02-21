const { getAllProducts, getProductByID } = require("./productsControllers");
const { userDetails } = require("./userControllers");

module.exports = {
    getAllProducts, getProductByID,
    userDetails
}