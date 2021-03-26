const express = require("express");
const router = express.Router();
const { auth, admin } = require("../../settings");
const {
    userDetails, loginUser, registerUser, updateUserDetails,
    getUsers, deleteUser, updateUser, getUserById } = require("../../controllers");

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
    .get(auth, admin, getUserById)
    .put(auth, admin, updateUser)
    .delete(auth, admin, deleteUser);

module.exports = router;