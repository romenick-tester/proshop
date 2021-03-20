const { getAllProducts, getProductByID } = require("./productsControllers");
const { userDetails, loginUser, registerUser, updateUserDetails } = require("./userControllers");

module.exports = {
    getAllProducts,
    getProductByID,
    userDetails,
    loginUser,
    registerUser,
    updateUserDetails,
}