const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:       { type: String, required },
    email:      { type: String, required, unique },
    password:   { type: String, required },
    isAdmin:    { type: Boolean, required, default: false },
}, { timestamps });

const User = mongoose.model("User", UserSchema);

module.exports = User;