const Product = require("../models/Product");

async function getProducts(req, res) {
    const products = await Product.findAll();
    res.json({ products });
}

module.exports = { getProducts };