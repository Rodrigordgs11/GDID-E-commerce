const { sequelize } = require("../config/database");
const Users = require("../models/User");
const Roles = require("../models/Role");
const Product = require("../models/Product");
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");

const seed = async () => {
    try {
        await sequelize.sync({ force: true }); 

        const roles = await Promise.all([
            Roles.create({ name: "customer" }),
            Roles.create({ name: "admin" })
        ]);

        const customerRole = roles.find(role => role.name === "customer");
        const adminRole = roles.find(role => role.name === "admin");

        const users = [
            { email: "user@gmail.com", name: "User", phone: "123456789", password: "user", roleId: customerRole.id },
            { email: "rodrigordgs11@gmail.com", name: "Rodrigo", phone: "987654321", password: "rodrigo", roleId: adminRole.id },
            { email: "pedroslv05@gmail.com", name: "Pedro", phone: "987654321", password: "pedro", roleId: adminRole.id }
        ];

        for (const user of users) {
            await Users.create(user);
        }
        
        const products = [
            {
                name: "Apple iPhone 17 Air",
                price: 1099.00,
                description: "The upcoming iPhone 17 Air is expected to be the thinnest iPhone ever, featuring a 5.5mm thickness and a 6.9-inch display.",
                image: "https://cdn.4gnews.pt/imagens/iphone-17-air-pode-ter-uma-agradavel-surpresa-na-bateria-og.jpg?class=ogImageSquare"
            },
            {
                name: "Samsung Galaxy S25",
                price: 999.00,
                description: "The Galaxy S25 features a 6.2-inch Dynamic LTPO AMOLED 2X display, Snapdragon 8 Elite processor, and a versatile triple-camera setup.",
                image: "https://images.samsung.com/is/image/samsung/p6pim/pt/2501/gallery/pt-galaxy-s25-s931-sm-s931blbgeub-544730008?$720_576_JPG$"
            },
            {
                name: "Iphone 16 Pro Max",
                price: 1399.00,
                description: "The iPhone 16 Pro Max features a 6.7-inch OLED display, triple-camera system, and A16 Bionic chip for enhanced performance.",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9CMCcU0zunZlAXF1I6Gf_8jqQ5ITuMHjO_w&s"
            },
            {
                name: "Xiaomi 12 Ultra",
                price: 899.00,
                description: "The Xiaomi 12 Ultra features a 6.81-inch AMOLED display, Snapdragon 8 Gen 2 processor, and a versatile camera system.",
                image: "https://cdn-files.kimovil.com/default/0007/52/thumb_651763_default_big.jpg"
            },
            {
                name: "Huawei Mate X6",
                price: 2499.00,
                description: "The Huawei Mate X6 is a foldable smartphone featuring a 7.93-inch OLED flexible display, high-quality camera system, and robust performance.",
                image: "https://cdn-files.kimovil.com/default/0011/11/thumb_1010213_default_big.jpg"
            },
            {
                name: "Google Pixel 9",
                price: 899.00,
                description: "The Google Pixel 9 offers a sleek design, exceptional camera capabilities, AI photo editing features, and guaranteed seven years of OS updates.",
                image: "https://hipermercado.pt/426748-large_default/smartphone-google-pixel-9-63-12gb256gb-dual-sim-obsidian.jpg"
            },
            {
                name: "OnePlus 13",
                price: 799.00,
                description: "The OnePlus 13 is ideal for quick charging and robust battery life with a 6.82-inch screen, improved camera system, and strong dust and water resistance.",
                image: "https://myfusionmobile.com/storage/2024/02/OnePlus-12-500x500.jpg"
            },
            {
                name: "Samsung Galaxy Note 22",
                price: 1199.00,
                description: "The Samsung Galaxy Note 22 features a 6.8-inch AMOLED display, S Pen support, and a versatile camera system.",
                image: "https://images.samsung.com/is/image/samsung/p6pim/levant/2202/gallery/levant-galaxy-s22-ultra-s908-413037-sm-s908edrgmea-530970206"
            }
        ];

        await Product.bulkCreate(products);

        const orders = [
            { total: 1099.00, status: "Pendente", userId: (await Users.findOne({ where: { email: "user@gmail.com" } })).id, date: new Date(2025, 3, 21) },
            { total: 999.00, status: "Enviada", userId: (await Users.findOne({ where: { email: "user@gmail.com" } })).id, date: new Date(2024, 12, 1) },
            { total: 1399.00, status: "Cancelada", userId: (await Users.findOne({ where: { email: "user@gmail.com" } })).id, date: new Date(2024, 0, 15) },
            { total: 2098.00, status: "Entregue", userId: (await Users.findOne({ where: { email: "user@gmail.com" } })).id, date: new Date(2023, 11, 30) },
            { total: 799.00, status: "Entregue", userId: (await Users.findOne({ where: { email: "user@gmail.com" } })).id, date: new Date(2023, 10, 5) }

        ];

        await Order.bulkCreate(orders);

        const orderItems = [
            { quantity: 1, price: 1099.00, orderId: (await Order.findOne({ where: { total: 1099.00 } })).id, productId: (await Product.findOne({ where: { name: "Apple iPhone 17 Air" } })).id },
            { quantity: 1, price: 999.00, orderId: (await Order.findOne({ where: { total: 999.00 } })).id, productId: (await Product.findOne({ where: { name: "Samsung Galaxy S25" } })).id },
            { quantity: 1, price: 1399.00, orderId: (await Order.findOne({ where: { total: 1399.00 } })).id, productId: (await Product.findOne({ where: { name: "Iphone 16 Pro Max" } })).id },
            { quantity: 1, price: 1099.00, orderId: (await Order.findOne({ where: { total: 2098.00 } })).id, productId: (await Product.findOne({ where: { name: "Apple iPhone 17 Air" } })).id },
            { quantity: 1, price: 999.00, orderId: (await Order.findOne({ where: { total: 2098.00 } })).id, productId: (await Product.findOne({ where: { name: "Samsung Galaxy S25" } })).id},
            { quantity: 1, price: 799.00, orderId: (await Order.findOne({ where: { total: 799.00 } })).id, productId: (await Product.findOne({ where: { name: "OnePlus 13" } })).id }
        ];

        await OrderItem.bulkCreate(orderItems);

        console.log("Database seeded successfully.");
    } catch (error) {
        console.error("Error seeding database:", error);
    }
};

module.exports = seed;
