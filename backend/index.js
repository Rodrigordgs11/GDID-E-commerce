const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize } = require('./src/config/database');
const userRoutes = require('./src/routes/userRoutes');
const seed = require('./src/seeders/seed');
require('./src/models/relationships');

const app = express();

app.use(
    cors({
        origin: ["http://localhost:8181"],
        methods: "GET,POST,PUT,DELETE,OPTIONS",
        allowedHeaders: "Content-Type,Authorization",
        credentials: true,
    })
);

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync({ force: false }).then(() => {
    seed();
});

app.use("/", userRoutes);

app.get("/", function(req, res) {
    return res.send("Hello World - E-commerce!!!");
});

const products = [
    { id: 1, name: "Fancy Phone", price: 250.00, oldPrice: null, image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg" },
    { id: 2, name: "Pro Smartphone", price: 180, oldPrice: 200, image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg" },
    { id: 3, name: "Deluxe Phone", price: 250, oldPrice: 500, image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg" },
    { id: 4, name: "Flagship Phone", price: 999, image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg" },
    { id: 5, name: "Super Phone", price: 150, oldPrice: 200, image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg" },
    { id: 6, name: "Ultra Phone", price: 200, oldPrice: 300, image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg" },
    { id: 7, name: "Mega Phone", price: 350, oldPrice: 500, image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg" },
    { id: 8, name: "Giga Phone", price: 400, oldPrice: 600, image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg" },
];

app.get("/products", (req, res) => {
    res.json({ products });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Backend E-commerce running on port ${PORT}`));
