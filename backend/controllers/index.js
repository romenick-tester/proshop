const { getAllProducts, getProductDetails, createProduct, updateProduct, deleteProduct } = require("./productsControllers");
const { createOrder, getMyOrders, getMyOrderDetails, updateOrderPaid, getAllOrders } = require("./orderControllers");
const {
    userDetails, loginUser, registerUser, updateUserDetails,
    getUsers, deleteUser, updateUser, getUserById } = require("./userControllers");

module.exports = {
    getAllProducts,
    getProductDetails,
    deleteProduct,
    createProduct,
    updateProduct,
    userDetails,
    loginUser,
    registerUser,
    updateUserDetails,
    createOrder,
    getMyOrderDetails,
    getMyOrders,
    updateOrderPaid,
    getAllOrders,
    getUsers,
    deleteUser,
    updateUser,
    getUserById,
}