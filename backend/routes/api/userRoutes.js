const express = require("express");
const router = express.Router();
const { userDetails } = require("../../controllers");

router.route("/")
    .get(userDetails);

module.exports = router;