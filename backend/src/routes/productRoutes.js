const express = require("express");
const { getProducts } = require("../services/productService");

const router = express.Router();

router.get("/products", getProducts);

module.exports = router;