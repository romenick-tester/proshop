const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const auth = async (req, res, next) => {
    try {
        const token = await req.header("auth-token");

        if (!token) {
            return res.status(400).json({ errors: [{ msg: "invalid token, access denied" }] });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = { id: decoded.id, isAdmin: decoded.isAdmin };

        next();
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
}

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401)
        throw new Error("Not authorised, admin access only.")
    }
}

module.exports = { auth, admin };