const express = require("express");
const { signup, login, logout, getAllUsers } = require("../Controllers/userController");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Updated route name to `/users` for clarity and convention
router.get("/users", getAllUsers);

module.exports = router;
