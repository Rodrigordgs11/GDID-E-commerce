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

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Backend E-commerce running on port ${PORT}`));
