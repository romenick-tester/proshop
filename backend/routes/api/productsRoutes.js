const express = require("express");
const router = express.Router();
const { getAllProducts, getProductByID } = require("../../controllers");

router.route("/")
    .get(getAllProducts);

router.route("/:product_id")
    .get(getProductByID);


module.exports = router;