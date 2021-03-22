const asyncHandler = require("express-async-handler");
const { Order } = require("../settings");

//route:        POST /api/orders
//desc:         create and return orders
//access:       private
const createOrder = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error("No order items");

    } else {
        const order = new Order({
            user: req.user.id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        })

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    }
});

module.exports = { createOrder };