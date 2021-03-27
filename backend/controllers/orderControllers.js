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

        const newOrder = await order.save();

        res.status(201).json({ newOrder });
    }
});

//route:        GET /api/orders/order/:id
//desc:         return current user's order
//access:       private
const getMyOrderDetails = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

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
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user.id });

    if (!orders) {
        res.status(404)
        throw new Error("Orders not found!");
    } else {
        res.status(200).json({ orders });
    }
});

//route:        PUT /api/orders/order/:id/pay
//desc:         update order to paid
//access:       private
const updateOrderPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        res.status(404)
        throw new Error("Order not found!");
    } else {
        order.isPaid = true;
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }

        await order.save();

        res.status(200).json({ msg: "Payment successful!" });
    }
});

//route:        GET /api/orders/all
//desc:         return current user's orders
//access:       private
const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate("user", "id name");

    if (!orders) {
        res.status(404)
        throw new Error("Orders not found!");
    } else {
        res.status(200).json({ orders });
    }
});


//route:        PUT /api/orders/order/:id/pay
//desc:         update order to paid
//access:       private
const updateOrderDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        res.status(404)
        throw new Error("Order not found!");
    } else {
        order.isDelivered = true;
        order.deliveredAt = Date.now()

        await order.save();

        res.status(200).json({ msg: "Delivery successful!" });
    }
});

module.exports = { createOrder, getMyOrderDetails, getMyOrders, updateOrderPaid, getAllOrders, updateOrderDelivered };