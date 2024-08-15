const express = require("express");
const mongoose = require("mongoose");
const todoHandler = require("./routeHandler/todoHandler");
const userHandler = require("./routeHandler/userHandler");
require('dotenv').config()

const app = express();
app.use(express.json());


// Connecting to Mongoose
// mongoose.connect('mongodb://localhost:27017/todo')
mongoose.connect('mongodb://127.0.0.1:27017/todo')
    .then(() => console.log("connection successful"))
    .catch((err) => console.log(err));

// Routes
app.use("/todo", todoHandler);
app.use("/user", userHandler);



const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: err });
}
app.use(errorHandler);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});