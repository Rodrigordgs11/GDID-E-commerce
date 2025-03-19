const Product = require("../models/Product");

async function getProducts(req, res) {
    const products = await Product.findAll();
    res.json({ products });
}

async function getProduct(req, res) {
    console.log("getProduct");
    console.log(req.params.id);
    const product = await Product.findByPk(req.params.id);
    if (!product) {
        return res.status(404).json({ error: "Produto não encontrado" });
    }
    res.json(product);
}

module.exports = { getProducts, getProduct };