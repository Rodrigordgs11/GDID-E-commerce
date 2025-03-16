const Users = require("../models/User");
const Roles = require("../models/Role");
const jwt = require("jsonwebtoken");
const { getPublicKey } = require("../middlewares/authenticate");

async function createUser(req, res) {
    try {
        const { email, password } = req.body;
        const role = await Roles.findOne({ where: { name: "customer" } });
        const user = await Users.create({ email, password, roleId: role.id });
        return res.status(201).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error creating user" });
    }
}

async function getUserRole(req, res) {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) return res.status(401).json({ message: "Token not provided." });

        const decodedHeader = jwt.decode(token, { complete: true });
        if (!decodedHeader) return res.status(401).json({ message: "Invalid JWT format." });

        console.log(decodedHeader.header.kid);
        const publicKey = await getPublicKey(decodedHeader.header.kid);
        const decoded = jwt.verify(token, publicKey, { algorithms: ["RS256"] });

        let user = await Users.findOne({ where: { email: decoded.email } });
        if (!user) {
            const role = await Roles.findOne({ where: { name: "customer" } });
            user = await Users.create({ email: decoded.email, name: decoded.name, phone: decoded.phone, roleId: role.id });
        }

        const userRole = await Roles.findOne({ where: { id: user.roleId } });
        return res.json({ role: userRole.name });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching user role" });
    }
}

async function getUser(req, res) {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) return res.status(401).json({ message: "Token not provided." });

        const decodedHeader = jwt.decode(token, { complete: true });
        if (!decodedHeader) return res.status(401).json({ message: "Invalid JWT format." });

        const publicKey = await getPublicKey(decodedHeader.header.kid);
        const decoded = jwt.verify(token, publicKey, { algorithms: ["RS256"] });

        const user = await Users.findOne({ where: { email: decoded.email } });
        if (!user) return res.status(404).json({ message: "User not found." });

        return res.json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching user data" });
    }
}

async function updateUser(req, res) {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) return res.status(401).json({ message: "Token not provided." });

        const decodedHeader = jwt.decode(token, { complete: true });
        if (!decodedHeader) return res.status(401).json({ message: "Invalid JWT format." });

        const publicKey = await getPublicKey(decodedHeader.header.kid);
        const decoded = jwt.verify(token, publicKey, { algorithms: ["RS256"] });

        const user = await Users.findOne({ where: { email: decoded.email } });
        if (!user) return res.status(404).json({ message: "User not found." });

        const { name, phone } = req.body;
        await user.update({ name, phone });

        return res.json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error updating user data" });
    }
}

module.exports = { createUser, getUserRole, getUser, updateUser };
