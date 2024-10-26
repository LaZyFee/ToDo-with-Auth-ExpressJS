const bcrypt = require("bcrypt");
const User = require("../schemas/userSchemas");
const { generateToken } = require("../Utils/generateToken");

// Helper function to validate request fields
const validateFields = (fields) => {
    for (let [key, value] of Object.entries(fields)) {
        if (!value) return `${key} is required`;
    }
    return null;
};

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate fields
        const error = validateFields({ name, email, password });
        if (error) return res.status(400).json({ message: error });

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Hash password and create new user
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashPassword });
        await newUser.save();

        // Generate token
        const token = generateToken(newUser);

        // Send response with user data and token
        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
            token,
        });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "An error occurred during signup" });
    }
};



const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const error = validateFields({ email, password });
        if (error) return res.status(400).json({ message: error });

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        // Log user details to ensure user exists and has an ID
        console.log("Authenticated User:", user);

        const token = generateToken(user);
        console.log("Generated Token:", token);

        res.status(200).json({
            message: "Login successful",

            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            },
            token,
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: error.message });
    }
};


const logout = async (req, res) => {
    try {
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ data: users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { signup, login, logout, getAllUsers };