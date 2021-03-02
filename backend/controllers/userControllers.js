const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonWebToken");
const { User } = require("../settings");

//route:        GET /api/users
//desc:         return current user's details
//access:       public
const userDetails = asyncHandler( async(req,res) => {
    const user = await User.findOne({ _id: req.user.id });

    if (!user) {
        res.status(404)
        throw new Error("user not found!")
    } else {
        res.json(user);
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

module.exports = { userDetails, loginUser, registerUser };