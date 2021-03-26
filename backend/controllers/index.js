const { getAllProducts, getProductDetails, deleteProduct } = require("./productsControllers");
const { createOrder, getOrders, getOrder, updateOrderPaid } = require("./orderControllers");
const {
    userDetails, loginUser, registerUser, updateUserDetails,
    getUsers, deleteUser, updateUser, getUserById } = require("./userControllers");

module.exports = {
    getAllProducts,
    getProductDetails,
    deleteProduct,
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