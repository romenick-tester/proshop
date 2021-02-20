const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    user:               { type: Schema.Types.ObjectId, required, ref: "User" },
    orderItems:         [
        {
            name:       { type: String, required },
            qty:        { type: Number, required, default: 0 },
            image:      { type: String, required },
            price:      { type: Number, required, default: 0 },
            product:    { type: Schema.Types.ObjectId, required, ref: "Product" },
        }
    ],
    shippingAddress:    [
        {
            address:    { type: String, required },
            city:       { type: String, required },
            postcode:   { type: String, required },
            country:    { type: String, required },
        }
    ],
    paymentMethod:      { type: String, required },
    paymentResult:      {
        id:             { type: String },
        status:         { type: String },
        update_time:    { type: String },
        email_address:  { type: String },
    },
    taxPrice:           { type: Number, required, default: 0.0 },
    shippingPrice:      { type: Number, required, default: 0.0 },
    totalPrice:         { type: Number, required, default: 0.0 },
    isPaid:             { type: Boolean, required, default: false },
    paidAt:             { type: Date },
    isDelivered:        { type: Boolean, default: false },
    deliveredAt:        { type: Date }
}, { timestamps });

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;