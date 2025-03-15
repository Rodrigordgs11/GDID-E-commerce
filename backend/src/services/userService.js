const Users = require("../models/User");
const Roles = require("../models/Role");

async function createUser(req, res) {
    const { email, password } = req.body;
    const role = await Roles.findOne({ where: { name: "customer" } });
    const user = await Users.create({ email, password, roleId: role.id });
    res.status(201).json(user);
}

module.exports = { createUser };