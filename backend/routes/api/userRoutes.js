const express = require("express");
const router = express.Router();
const { userDetails, loginUser, registerUser, updateUserDetails } = require("../../controllers");
const { auth } = require("../../settings");

router
    .route("/user")
    .get(auth, userDetails)
    .put(auth, updateUserDetails);

router
    .route("/register")
    .post(registerUser);

router
    .route("/login")
    .post(loginUser);

module.exports = router;