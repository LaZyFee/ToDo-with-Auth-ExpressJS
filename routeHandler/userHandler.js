const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
// Importing Schema
const userSchema = require("../schemas/userSchemas");

// Creating Model
const User = mongoose.model("User", userSchema);

router.post("/signup", async (req, res) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            password: hashPassword
        });
        await newUser.save();
        res.status(200).json({
            message: "User created successfully",
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await User.find({ username: req.body.username });
        if (user && user.length > 0) {
            const isValidPassword = await bcrypt.compare(req.body.password, user[0].password);
            if (isValidPassword) {
                // Generate JWT token
                const token = jwt.sign({
                    username: user[0].username,
                    userId: user[0]._id,
                }, process.env.JWT_SECRET, {
                    expiresIn: "3d"
                });
                res.status(200).json({
                    message: "Login successful",
                    token
                });
            }
        }
        else {

            res.status(401).json({
                message: "Authentication failed",
            });
        }
    }
    catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});
//get all users
router.get("/all", async (req, res) => {
    try {
        const users = await User.find()
            .populate("todos")
        res.status(200).json({
            result: users
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});
module.exports = router;