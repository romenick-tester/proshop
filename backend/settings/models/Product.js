const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    name:           {type: String, required },
    rating:         {type: Number, required, default: 0 },
    comment:        {type: String, required },
}, { timestamps });

const ProductSchema = new Schema({
    user:           { type: Schema.Types.ObjectId, required, ref: "User" },
    name:           { type: String, required },
    image:          { type: String, required },
    brand:          { type: String, required },
    category:       { type: String, required },
    description:    { type: String, required },
    review:         [ ReviewSchema ],
    rating:         { type: Number, required, default: 0 },
    price:          { type: Number, required, default: 0 },
    countInStock:   { type: Number, required, default: 0 },
}, { timestamps });

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;