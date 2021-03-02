const express = require("express");
const router = express.Router();
const { userDetails, loginUser, registerUser } = require("../../controllers");
const { auth } = require("../../settings");

router
    .route("/")
    .get(auth, userDetails);

router
    .route("/register")
    .post(registerUser);

router
    .route("/login")
    .post(loginUser);

module.exports = router;