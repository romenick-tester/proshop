const express = require("express");
const router = express.Router();
const { getAllProducts, getProductByID } = require("../controllers/productsControllers");

router.route("/")
.get(getAllProducts)

router.route("/:id")
.get(getProductByID)


module.exports = router;