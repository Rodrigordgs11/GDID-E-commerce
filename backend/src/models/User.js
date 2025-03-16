const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const { sequelize } = require("../config/database");

const Users = sequelize.define("Users", {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    password: { type: DataTypes.STRING }
  });

Users.beforeCreate(async (user) => {
  if (user.password) user.password = await bcrypt.hash(user.password, 10);
});

module.exports = Users;