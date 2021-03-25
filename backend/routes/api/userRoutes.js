const express = require("express");
const router = express.Router();
const { userDetails, loginUser, registerUser, updateUserDetails, getUsers } = require("../../controllers");
const { auth, admin } = require("../../settings");

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

router
    .route("/")
    .get(auth, admin, getUsers);

module.exports = router;