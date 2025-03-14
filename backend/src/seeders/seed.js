const { sequelize } = require("../config/database");
const Users = require("../models/User");
const Roles = require("../models/Role");
const Product = require("../models/Product");

const seed = async () => {
    await sequelize.sync({ force: true });

    const roles = [
        { name: "customer" },
        { name: "admin" }
    ];

    const users = [
        { username: "user", password: "user", roleId: "1" },
        { username: "rodrigordgs11", password: "rodrigo", roleId: "2" },
        { username: "pedroslv05", password: "pedro", roleId: "2" }
    ];

    const products = [
        {
            "name": "Apple iPhone 17 Air",
            "price": 1099.00,
            "description": "The upcoming iPhone 17 Air is expected to be the thinnest iPhone ever, featuring a 5.5mm thickness and a 6.9-inch display.",
            "image": "https://cdn.4gnews.pt/imagens/iphone-17-air-pode-ter-uma-agradavel-surpresa-na-bateria-og.jpg?class=ogImageSquare"
        },
        {
            "name": "Samsung Galaxy S25",
            "price": 999.00,
            "description": "The Galaxy S25 features a 6.2-inch Dynamic LTPO AMOLED 2X display, Snapdragon 8 Elite processor, and a versatile triple-camera setup.",
            "image": "https://images.samsung.com/is/image/samsung/p6pim/pt/2501/gallery/pt-galaxy-s25-s931-sm-s931blbgeub-544730008?$720_576_JPG$"
        },
        {
            "name": "Iphone 16 Pro Max",
            "price": 1399.00,
            "description": "The iPhone 16 Pro Max features a 6.7-inch OLED display, triple-camera system, and A16 Bionic chip for enhanced performance.",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9CMCcU0zunZlAXF1I6Gf_8jqQ5ITuMHjO_w&s"
        },
        {
            "name": "Xiaomi 12 Ultra",
            "price": 899.00,
            "description": "The Xiaomi 12 Ultra features a 6.81-inch AMOLED display, Snapdragon 8 Gen 2 processor, and a versatile camera system.",
            "image": "https://cdn-files.kimovil.com/default/0007/52/thumb_651763_default_big.jpg"
        },
        {
            "name": "Huawei Mate X6",
            "price": 2499.00,
            "description": "The Huawei Mate X6 is a foldable smartphone featuring a 7.93-inch OLED flexible display, high-quality camera system, and robust performance.",
            "image": "https://cdn-files.kimovil.com/default/0011/11/thumb_1010213_default_big.jpg"
        },
        {
            "name": "Google Pixel 9",
            "price": 899.00,
            "description": "The Google Pixel 9 offers a sleek design, exceptional camera capabilities, AI photo editing features, and guaranteed seven years of OS updates.",
            "image": "https://hipermercado.pt/426748-large_default/smartphone-google-pixel-9-63-12gb256gb-dual-sim-obsidian.jpg"
        },
        {
            "name": "OnePlus 13",
            "price": 799.00,
            "description": "The OnePlus 13 is ideal for quick charging and robust battery life with a 6.82-inch screen, improved camera system, and strong dust and water resistance.",
            "image": "https://myfusionmobile.com/storage/2024/02/OnePlus-12-500x500.jpg"
        },
        {
            "name": "Samsung Galaxy Note 22",
            "price": 1199.00,
            "description": "The Samsung Galaxy Note 22 features a 6.8-inch AMOLED display, S Pen support, and a versatile camera system.",
            "image": "https://images.samsung.com/is/image/samsung/p6pim/levant/2202/gallery/levant-galaxy-s22-ultra-s908-413037-sm-s908edrgmea-530970206"
        }
    ];

    for (let role of roles) {
        await Roles.create(role);
    }

    for (let user of users) {
        await Users.create(user);
    }

    for (let product of products) {
        await Product.create(product);
    }

    console.log("Database seeded successfully.");
}

module.exports = seed;