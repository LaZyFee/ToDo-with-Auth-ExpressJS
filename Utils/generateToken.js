const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    // Ensure user has an `_id` before generating a token
    if (!user || !user._id) {
        throw new Error("User ID is required to generate token.");
    }
    return jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET, // Ensure this secret key is set in .env
        { expiresIn: "7d" }
    );
};

module.exports = { generateToken };
