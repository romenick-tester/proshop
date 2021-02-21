const asyncHandler = require("express-async-handler");

//route:        GET /api/users
//desc:         return current user's details
//access:       public
const userDetails = asyncHandler( async(req,res) => {
    res.send("user route");
});

module.exports = { userDetails };