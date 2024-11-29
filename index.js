require("dotenv").config();
const express = require("express");
const cors = require("cors");
const todoHandler = require("./routeHandler/todoHandler");
const userHandler = require("./routeHandler/userHandler");
const connectDB = require("./DB/connectDB");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: ["http://localhost:5173", "https://todowebappx.netlify.app"],
        credentials: true,
    })
);

// Connect to the database
connectDB();

// Routes
app.use("/user", userHandler);
app.use("/todo", todoHandler);

// Error handler
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: err });
};
app.use(errorHandler);

app.get("/", (req, res) => {
    res.send("Hello World!");
});