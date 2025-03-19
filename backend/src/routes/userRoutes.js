const express = require("express");
const { createUser, getUsers, getUserRole, getUser, updateUserProfile, updateUser, deleteUser } = require("../services/userService");

const router = express.Router();

router.post("/users", createUser);
router.get("/users", getUsers);
router.get("/user-role", getUserRole);
router.get("/user", getUser);
router.put("/user", updateUserProfile);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

module.exports = router;


