const asyncHandler = require("express-async-handler");
const { Product } = require("../settings");

//route:        GET /api/products
//desc:         return all products
//access:       public
const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});

    if (!products) {
        //return res.status(404).json({ errors: [{ msg: "products not found!" }] });
        res.status(404)
        throw new Error("Products not found!");
    }

    //throw new Error("some error"); for testing...

    res.status(200).json({ products });
})

//route:        GET /api/products/:product_id
//desc:         return a single product
//access:       public
const getProductDetails = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        //return res.status(404).json({ errors: [{ msg: "product not found!" }] });
        res.status(404)
        throw new Error("Product not found!");
    } else {

        res.status(200).json({ product });
    }

})

//route:        DELETE /api/products/product/:id
//desc:         delete a product
//access:       admin/private
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        //return res.status(404).json({ errors: [{ msg: "product not found!" }] })
        res.status(404)
        throw new Error("Product not found!");
    } else {

        await product.remove();

        res.status(200).json({ deleted: true });
    }

})

module.exports = { getAllProducts, getProductDetails, deleteProduct };