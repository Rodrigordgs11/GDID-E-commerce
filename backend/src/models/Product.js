const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Product = sequelize.define("Product", {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false }
  });

module.exports = Product;