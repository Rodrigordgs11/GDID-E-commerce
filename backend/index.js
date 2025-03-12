const express = require('express');
const { sequelize } = require('./src/config/database');

const app = express();

sequelize.sync();

app.get("/", function(req, res) {
    return res.send("Hello World - E-commerce!!!");
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Backend E-commerce running on port ${PORT}`));
