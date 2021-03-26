const { getAllProducts, getProductByID } = require("./productsControllers");
const { userDetails, loginUser, registerUser, updateUserDetails, getUsers, deleteUser } = require("./userControllers");
const { createOrder, getOrders, getOrder, updateOrderPaid } = require("./orderControllers");

module.exports = {
    getAllProducts,
    getProductByID,
    userDetails,
    loginUser,
    registerUser,
    updateUserDetails,
    createOrder,
    getOrder,
    getOrders,
    updateOrderPaid,
    getUsers,
    deleteUser,
}