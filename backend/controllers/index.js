const { getAllProducts, getProductByID } = require("./productsControllers");
const { userDetails, loginUser, registerUser, updateUserDetails } = require("./userControllers");
const { createOrder } = require("./orderControllers");

module.exports = {
    getAllProducts,
    getProductByID,
    userDetails,
    loginUser,
    registerUser,
    updateUserDetails,
    createOrder,
}