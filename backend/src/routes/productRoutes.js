const express = require("express");
const { getProducts } = require("../services/productService");
const checkRole = require("../middlewares/authMiddleware");
const authenticate = require("../middlewares/autenticate");

const router = express.Router();

router.get("/products", authenticate, checkRole("customer"), getProducts);

module.exports = router;