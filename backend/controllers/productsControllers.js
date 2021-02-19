const { data } = require("../manager")

const getAllProducts = (req,res) => {
    const { products } = data;
    
    res.json(products);
}



module.exports = { getAllProducts };