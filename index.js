const express = require("express");
const todoHandler = require("./routeHandler/todoHandler");
const userHandler = require("./routeHandler/userHandler");
const connectDB = require("./DB/connectDB");
require('dotenv').config()

const app = express();
app.use(express.json());

// Routes
app.use("/user", userHandler);
app.use("/todo", todoHandler);


const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: err });
}
app.use(errorHandler);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
    connectDB();
});