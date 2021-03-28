const express = require("express");
const router = express.Router();
const { auth, admin } = require("../settings");
const {
    getAllProducts,
    getProductDetails,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getTopProducts,
} = require("../controllers");

router
    .route("/")
    .get(getAllProducts)
    .post(auth, admin, createProduct);

router
    .route("/top")
    .get(getTopProducts);

router
    .route("/:id")
    .get(getProductDetails);

router
    .route("/product/:id")
    .put(auth, admin, updateProduct)
    .delete(auth, admin, deleteProduct);

router
    .route("/product/:id/review")
    .post(auth, createProductReview);

module.exports = router;