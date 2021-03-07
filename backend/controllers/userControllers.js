const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonWebToken");
const { User } = require("../settings");

//route:        GET /api/users
//desc:         return current user's details
//access:       private
const userDetails = asyncHandler( async(req,res) => {
    const user = await User.findById(req.user.id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            // token: jwt.sign({
            //     id: user._id,
            //     isAdmin: user.isAdmin
            // }, process.env.JWT_SECRET, { expiresIn: 36000 }),
        })

    } else {
        res.status(404)
        throw new Error("User not found!")
    }
});

//route:        PUT /api/users
//desc:         update current user's details
//access:       private
const updateUserDetails = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin || user.isAdmin;

        user.password = req.body.password
            ? await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
            : user.password;

        const updatedDetails = await user.save();

        res.send({
            _id: updatedDetails._id,
            name: updatedDetails.name,
            email: updatedDetails.email,
            isAdmin: updatedDetails.isAdmin,
            token: jwt.sign({
                id: updatedDetails._id,
                isAdmin: updatedDetails.isAdmin
            }, process.env.JWT_SECRET, { expiresIn: 36000 }),
        })

    } else {
        res.status(404)
        throw new Error("User not found!")
    }
});

//route:        POST /api/users/register
//desc:         register user & return token
//access:       public
const registerUser = asyncHandler(async (req, res) => {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
        res.status(400)
        throw new Error("this user already taken!")
    }

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(req.body.password, salt);

    const newUser = await user.save();

    if (newUser) {

        res.json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: jwt.sign({
                id: newUser._id,
                isAdmin: newUser.isAdmin
            }, process.env.JWT_SECRET, { expiresIn: 36000 }),
        });

    } else {
        res.status(400)
        throw new Error("invalid user credentials!")
    }
});

//route:        POST /api/users/login
//desc:         login user & return token
//access:       public
const loginUser = asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user && (await bcrypt.compare(req.body.password, user.password))) {

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: jwt.sign({
                id: user._id,
                isAdmin: user.isAdmin
            }, process.env.JWT_SECRET, { expiresIn: 36000 }),
        });

    } else {
        res.status(401)
        throw new Error("invalid credentials!");
    }
});

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select("-password");

    if (!users) {
        res.status(404)
        throw new Error("There are no users on the database.")
    }

    res.json(users);
})

module.exports = { userDetails, loginUser, registerUser, updateUserDetails, getAllUsers };