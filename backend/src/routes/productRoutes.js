const express = require("express");
const { getProducts, getProduct } = require("../services/productService");
const {authenticate} = require("../middlewares/authenticate");

const router = express.Router();

router.get("/products", authenticate, getProducts);
router.get("/products/:id", authenticate, getProduct);


module.exports = router;