const express = require("express");
const router = express.Router();
const { getAllProducts, getProductDetails, deleteProduct } = require("../../controllers");
const { auth, admin } = require("../../settings");

router
    .route("/")
    .get(getAllProducts);

router
    .route("/:id")
    .get(getProductDetails)

router
    .route("/product/:id")
    .delete(auth, admin, deleteProduct);


module.exports = router;