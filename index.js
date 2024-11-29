require("dotenv").config();
const express = require("express");
const cors = require("cors");
const todoHandler = require("./routeHandler/todoHandler");
const userHandler = require("./routeHandler/userHandler");
const connectDB = require("./DB/connectDB");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: ["http://localhost:5173", "https://todowebappx.netlify.app"],
        credentials: true,
    })
);

// Routes
app.use("/user", userHandler);
app.use("/todo", todoHandler);

// Error Handler
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: err.message });
};
app.use(errorHandler);

// Root Route
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// MongoDB Connection
connectDB();

// Export the app
module.exports = app;
