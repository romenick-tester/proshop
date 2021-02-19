const express = require("express");
const router = express.Router();
const { test } = require("../controllers/productsControllers");

router.route("/")
.get(test)


module.exports = router;