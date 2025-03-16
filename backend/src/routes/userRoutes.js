const express = require("express");
const { createUser, getUserRole, getUser, updateUser } = require("../services/userService");

const router = express.Router();

router.post("/users", createUser);
router.get("/user-role", getUserRole);
router.get("/user", getUser);
router.put("/user", updateUser);

module.exports = router;


