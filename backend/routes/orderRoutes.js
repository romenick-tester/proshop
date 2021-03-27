const express = require("express");
const router = express.Router();
const { createOrder, getMyOrders, getMyOrderDetails, updateOrderPaid } = require("../controllers");
const { auth } = require("../settings");

router
    .route("/")
    .get(auth, getMyOrders)
    .post(auth, createOrder);


router
    .route("/order/:id")
    .get(auth, getMyOrderDetails);

router
    .route("/order/:id/pay")
    .put(auth, updateOrderPaid);

module.exports = router;