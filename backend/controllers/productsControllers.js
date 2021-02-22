const asyncHandler = require("express-async-handler");
const { Product } = require("../settings");

//route:        GET /api/products
//desc:         return all products
//access:       public
const getAllProducts = asyncHandler( async(req,res) => {
    const products = await Product.find({});

    if(!products) {
        return res.status(404).json({ errors: [{ msg: "products not found!" }] });
    }

    //throw new Error("some error"); for testing...

    res.json(products);
})

//route:        GET /api/products/:product_id
//desc:         return a single product
//access:       public
const getProductByID = asyncHandler(async(req,res) => {
    const product = await Product.findById(req.params.product_id);

    if(!product) {
        return res.status(404).json({ errors: [{ msg: "product not found!" }] })
    }

    res.json(product);
})

module.exports = { getAllProducts, getProductByID };