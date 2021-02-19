const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const auth = async(req,res,next) => {
    try {
        const token = await req.header("auth-token");
        
        if(!token) {
            return res.status(400).json({ errors: [{ msg: "invalid token, access denied" }] });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded.user;

        next();
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
}

module.exports = auth;