const express = require("express");
const { getProducts } = require("../services/productService");
const {authenticate} = require("../middlewares/authenticate");

const router = express.Router();

router.get("/products", authenticate, getProducts);

module.exports = router;