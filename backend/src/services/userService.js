const Users = require("../models/User");
const Roles = require("../models/Role");
const jwt = require("jsonwebtoken");
const {getPublicKey} = require("../middlewares/authenticate");

async function createUser(req, res) {
    const { email, password } = req.body;
    const role = await Roles.findOne({ where: { name: "customer" } });
    const user = await Users.create({ email, password, roleId: role.id });
    res.status(201).json(user);
}

async function getUserRole(req, res) {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "Token not provided." });

    const decodedHeader = jwt.decode(token, { complete: true });
    if (!decodedHeader) return res.status(401).json({ message: "Invalid JWT format." });

    const publicKey = await getPublicKey(decodedHeader.header.kid);
    const decoded = jwt.verify(token, publicKey, { algorithms: ["RS256"] });

    let user = await Users.findOne({ where: { email: decoded.email } });
    if (!user) {
       const role = await Roles.findOne({ where: { name: "customer" } });
       user =  await Users.create({ email: decoded.email, password: null, roleId: role.id });
    }

    const userRole = await Roles.findOne({ where: { id: user.roleId } });

    return res.json({ role: userRole.name });
}   

module.exports = { createUser, getUserRole };