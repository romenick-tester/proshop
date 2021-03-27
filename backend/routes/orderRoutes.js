const express = require("express");
const router = express.Router();
const { auth, admin } = require("../settings");
const {
    createOrder, getMyOrders, getMyOrderDetails,
    updateOrderPaid, getAllOrders } = require("../controllers");

router
    .route("/")
    .get(auth, getMyOrders)
    .post(auth, createOrder);

router
    .route("/all")
    .get(auth, admin, getAllOrders);

router
    .route("/order/:id")
    .get(auth, getMyOrderDetails);

router
    .route("/order/:id/pay")
    .put(auth, updateOrderPaid);

module.exports = router;