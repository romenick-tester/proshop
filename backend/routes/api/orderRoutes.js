const express = require("express");
const router = express.Router();
const { createOrder } = require("../../controllers");
const { auth } = require("../../settings");

router.post("/", auth, createOrder);

module.exports = router;