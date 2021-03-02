const { getAllProducts, getProductByID } = require("./productsControllers");
const { userDetails, loginUser, registerUser } = require("./userControllers");

module.exports = {
    getAllProducts, getProductByID,
    userDetails, loginUser, registerUser,
}