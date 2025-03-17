const Orders = require("../models/Order");
const OrderItems = require("../models/OrderItem");
const Product = require("../models/Product");

async function getOrdersByUser(req, res) {
    try {
        const orders = await Orders.findAll({
            where: { userId: req.params.userId },
            include: [
                {
                    model: OrderItems,
                    include: [
                        {
                            model: Product,  
                            attributes: ['name'],  
                        }
                    ]
                }
            ]
        });

        res.json({ orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { getOrdersByUser };

