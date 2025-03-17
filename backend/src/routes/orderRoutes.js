const express = require("express");
const { authenticate } = require("../middlewares/authenticate");
const { getOrdersByUser } = require("../services/orderService");

const router = express.Router();

router.get("/orders/:userId", authenticate, getOrdersByUser);

module.exports = router;