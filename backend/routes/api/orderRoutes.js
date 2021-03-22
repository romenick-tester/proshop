const express = require("express");
const router = express.Router();
const { createOrder, getOrders, getOrder } = require("../../controllers");
const { auth } = require("../../settings");

router
    .route("/")
    .get(auth, getOrders)
    .post(auth, createOrder);


router
    .route("/order/:id")
    .get(auth, getOrder);

module.exports = router;