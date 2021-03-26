const express = require("express");
const router = express.Router();
const { userDetails, loginUser, registerUser, updateUserDetails, getUsers, deleteUser } = require("../../controllers");
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

router
    .route("/user/:id")
    .delete(auth, admin, deleteUser);

module.exports = router;