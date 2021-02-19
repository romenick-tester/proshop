const { data } = require("../manager")

const getAllProducts = (req,res) => {
    const { products } = data;
    
    if(!products) {
        return res.status(404).json({ errors: [{ msg: "products not found!" }] });
    }

    res.json(products);
}


const getProductByID = (req,res) => {
    const { products } = data;
    
    const product = products.find((item) => item.id === req.params.id);

    if(!product) {
        return res.status(404).json({ errors: [{ msg: "product not found!" }] })
    }

    res.json(product);
}

module.exports = { getAllProducts, getProductByID };