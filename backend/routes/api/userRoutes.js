const express = require("express");
const router = express.Router();
const { userDetails, loginUser, registerUser, updateUserDetails, getAllUsers } = require("../../controllers");
const { auth } = require("../../settings");

router
    .route("/")
    .get(auth, userDetails)
    .put(auth, updateUserDetails);

router
    .route("/all")
    .get(getAllUsers);

router
    .route("/register")
    .post(registerUser);

router
    .route("/login")
    .post(loginUser);

module.exports = router;