const express = require('express');
const { Sequelize } = require("sequelize");

const app = express();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: process.env.DB_PORT,
        logging: false
    }
);

sequelize
    .authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(error => console.error('Unable to connect to the database:', error));


app.get("/", function(req, res) {
    return res.send("Hello World - E-commerce!!!");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend E-commerce running on port ${PORT}`));

app.get('/status', (req, res) => {
    res.status(200).send('Server is running');
});