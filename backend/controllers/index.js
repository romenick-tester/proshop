const {
    getAllProducts,
    getProductDetails,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getTopProducts
} = require("./productsControllers");
const {
    createOrder,
    getMyOrders,
    getMyOrderDetails,
    updateOrderPaid,
    getAllOrders,
    updateOrderDelivered
} = require("./orderControllers");
const {
    userDetails,
    loginUser,
    registerUser,
    updateUserDetails,
    getUsers,
    deleteUser,
    updateUser,
    getUserById
} = require("./userControllers");

module.exports = {
    getAllProducts,
    getProductDetails,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    getTopProducts,
    userDetails,
    loginUser,
    registerUser,
    updateUserDetails,
    createOrder,
    getMyOrderDetails,
    getMyOrders,
    updateOrderPaid,
    updateOrderDelivered,
    getAllOrders,
    getUsers,
    deleteUser,
    updateUser,
    getUserById,
}