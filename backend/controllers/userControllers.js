const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonWebToken");
const { User } = require("../settings");

//route:        GET /api/users
//desc:         return current user's details
//access:       private
const userDetails = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select(["isAdmin", "name", "email", "_id"]);

    if (user) {

        res.status(200).json({ user })

    } else {
        res.status(404)
        throw new Error("User not found!")
    }
});

//route:        PUT /api/users
//desc:         update current user's details
//access:       private
const updateUserDetails = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const emailCheck = await User.findOne({ email });

    if (emailCheck) {
        throw new Error("This is email already exist!");
    }

    let user = await User.findById(req.user.id);

    if (!user) {
        throw new Error("User not found!");
    }

    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
        const salt = await bcrypt.genSalt(10);

        const hashPassword = await bcrypt.hash(password, salt);

        user.password = hashPassword || user.password;
    }

    await user.save();

    res.status(200).json({ msg: "User details updated!" });
});

//route:        POST /api/users/register
//desc:         register user & return token
//access:       public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
        res.status(400)
        throw new Error("this user already taken!");

    } else {
        user = new User({
            name,
            email,
            password,
        });

        const salt = await bcrypt.genSalt(10);

        const hashPassword = await bcrypt.hash(password, salt);

        user.password = hashPassword;

        const newUser = await user.save();

        const payload = { id: newUser._id, isAdmin: newUser.isAdmin };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 36000 });

        res.status(201).json({ token });
    }
});

//route:        POST /api/users/login
//desc:         login user & return token
//access:       public
const loginUser = asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user && (await bcrypt.compare(req.body.password, user.password))) {

        const payload = { id: user._id, isAdmin: user.isAdmin };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 36000 });

        res.status(200).json({ token });

    } else {
        res.status(401)
        throw new Error("invalid credentials!");
    }
});

//route:        GET /api/users
//desc:         return current user's details
//access:       private/admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select("-password");
    res.status(200).json({ users });
});

//route:        DELETE /api/users/user/:id
//desc:         delete a user
//access:       private/admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404)
        throw new Error("User not found!");
    } else {
        await user.remove();

        res.status(200).json({ msg: "User deleted!" });
    }
});

//route:        GET /api/users/user/:id
//desc:         return user details
//access:       private/admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
        res.status(404)
        throw new Error("User not found!");
    } else {
        res.status(200).json({ user });
    }
});

//route:        PUT /api/users/user/:id
//desc:         return user details
//access:       private/admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404)
        throw new Error("User not found!")
    } else {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin;

        await user.save();

        res.status(200).json({ updated: true })
    }
});

module.exports = { userDetails, loginUser, registerUser, updateUserDetails, getUsers, deleteUser, getUserById, updateUser };