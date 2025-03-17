const Users = require("./User");
const Roles = require("./Role");
const Products = require("./Product");
const Orders = require("./Order");
const OrderItems = require("./OrderItem");


Users.belongsTo(Roles, { foreignKey: "roleId" });
Roles.hasMany(Users, { foreignKey: "roleId" });

Orders.belongsTo(Users, { foreignKey: "userId" });
Users.hasMany(Orders, { foreignKey: "userId" });

Orders.hasMany(OrderItems, { foreignKey: "orderId" });
OrderItems.belongsTo(Orders, { foreignKey: "orderId" });

Products.hasMany(OrderItems, { foreignKey: "productId" });
OrderItems.belongsTo(Products, { foreignKey: "productId" });