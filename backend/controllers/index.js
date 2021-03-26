const { getAllProducts, getProductByID } = require("./productsControllers");
const { createOrder, getOrders, getOrder, updateOrderPaid } = require("./orderControllers");
const {
    userDetails, loginUser, registerUser, updateUserDetails,
    getUsers, deleteUser, updateUser, getUserById } = require("./userControllers");

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
    updateUser,
    getUserById,
}