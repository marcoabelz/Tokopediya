const express = require("express");
const { getAllUser, getUserById, register, updateUserById, deleteUserById, login } = require("../controllers/UserController");
const router = express.Router();

// define the home page route
router.get("/", getAllUser);
router.post("/register", register);
router.post("/login", login);
router.get("/:id", getUserById);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);

module.exports = router;
