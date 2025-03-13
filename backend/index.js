const express = require('express');
const cors = require('cors');
const { sequelize } = require('./src/config/database');

const app = express();
app.use(express.json());

app.use(
    cors({
        origin: ["http://localhost:8181"],
        methods: "GET,POST,PUT,DELETE,OPTIONS",
        allowedHeaders: "Content-Type,Authorization",
        credentials: true,
    })
);

sequelize.sync();

app.get("/", function(req, res) {
    return res.send("Hello World - E-commerce!!!");
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Backend E-commerce running on port ${PORT}`));
