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

//route:        GET /api/orders/order/:id
//desc:         return current user's order
//access:       private
const getOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        res.status(404)
        throw new Error("Order not found!");
    } else {
        res.status(200).json({ order });
    }
});

//route:        GET /api/orders
//desc:         return current user's orders
//access:       private
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user.id });

    if (!orders) {
        res.status(404)
        throw new Error("Orders not found!");
    } else {
        res.status(200).json({ orders });
    }
});


module.exports = { createOrder, getOrder, getOrders };