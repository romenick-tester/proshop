const asyncHandler = require("express-async-handler");
const { Product } = require("../settings");

//route:        GET /api/products
//desc:         return all products
//access:       public
const getAllProducts = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: "i"
        }
    } : {};

    const products = await Product.find({ ...keyword });

    if (!products) {
        res.status(404)
        throw new Error("Products not found!");
    }

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

//route:        POST /api/products
//desc:         create a product
//access:       admin/private
const createProduct = asyncHandler(async (req, res) => {
    const newProduct = new Product({
        name: "Sample",
        price: 0,
        user: req.user.id,
        image: "https://i.ibb.co/S6d4vjd/sample.jpg",
        brand: "sample brand",
        category: "sample category",
        countInStock: 1,
        description: "sample product",
    });

    await newProduct.save();

    res.status(201).json({ created: true });
})

//route:        PUT /api/products/product/:id
//desc:         update a product
//access:       admin/private
const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404)
        throw new Error("Product not found!");
    } else {

        product.name = req.body.name || product.name
        product.price = req.body.price || product.price
        product.user = req.user.id || product.user
        product.image = req.body.image || product.image
        product.brand = req.body.brand || product.brand
        product.category = req.body.category || product.category
        product.countInStock = req.body.countInStock || product.countInStock
        product.description = req.body.description || product.description

        await product.save();

        res.status(200).json({ updated: true })
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

//route:        POST /api/products/product/:id/review
//desc:         create a review
//access:       private
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404)
        throw new Error("Product not found!");
    } else {
        const alreadyReviewed = product.review.find((r) => String(r.user) === req.user.id);

        if (alreadyReviewed) {
            res.status(400)
            throw new Error("You've already reviewed this product.");
        } else {

            const review = {
                name: req.user.name,
                rating: Number(rating),
                comment,
                user: req.user.id,
            }


            product.review.push(review);

            product.numReviews = product.review.length;

            product.rating = product.review.reduce((acc, item) => item.rating + acc, 0) / product.review.length;

            await product.save();

            res.status(201).json({ reviewed: true });
        }
    }
})

module.exports = { getAllProducts, getProductDetails, createProduct, updateProduct, deleteProduct, createProductReview };