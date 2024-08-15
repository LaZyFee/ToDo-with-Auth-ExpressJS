const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const todoSchema = require("../schemas/todoSchema");
const userSchema = require("../schemas/userSchemas");

const checkLogin = require('../middlewares/checkLogin');

// Creating Model
const Todo = mongoose.model("Todo", todoSchema);
const User = mongoose.model("User", userSchema);

// Get all todos
router.get("/", checkLogin, async (req, res) => {
    try {
        const todos = await Todo.find({})
            // console.log(todos)
            .populate("user", "name username")
            .select({
                _id: 0,
                __v: 0,
                date: 0
            })
        // .limit(2);

        res.status(200).json({
            result: todos,
            message: "Todos retrieved successfully",
        });
    } catch (err) {
        console.error("Error retrieving todos:", err); // Optional: log error for debugging
        res.status(500).json({
            error: `Something went wrong, ${err.message}`
        });
    }
});




// Get all active todos
router.get("/active", async (req, res) => {
    const todo = new Todo();
    const data = await todo.findActive();
    res.status(200).json({
        data,
    })
});

/*
// Get all active todos with callbak
router.get("/active-callback", (req, res) => {
    const todo = new Todo();
    todo.findActiveCallback((err, data) => {
        res.status(200).json({
            data,
        })
    })
});
*/

//Get Todo using static method
router.get("/js", async (req, res) => {
    const data = await Todo.findByJs();
    res.status(200).json({
        data
    })

})
//Get Todo using Query helper
router.get("/language", async (req, res) => {
    const data = await Todo.find().byLanguage("js");
    res.status(200).json({
        data
    })

})

// Get a todo by id
router.get("/:id", async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({
                message: "Todo not found",
            });
        }
        res.status(200).json({
            message: "Todo retrieved successfully",
            data: todo,
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
});

// Post a todo
router.post("/", checkLogin, async (req, res) => {
    const newTodo = new Todo({
        ...req.body,
        user: req.userId
    });
    try {
        const todo = await newTodo.save();
        await User.updateOne({
            _id: req.userId
        },
            {
                $push: {
                    todos: todo._id
                }
            });
        res.status(201).json({
            message: "Todo created successfully",
            data: newTodo,
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
});

// Post all todos (this endpoint usually isn't common; consider adding logic if needed)
router.post("/all", async (req, res) => {
    try {
        const todos = req.body; // Assumes req.body is an array of todo objects
        const result = await Todo.insertMany(todos);
        res.status(201).json({
            message: "Todos created successfully",
            data: result,
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
});

// Put (update) a todo
router.put("/:id", async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // `new: true` returns the updated document, `runValidators: true` ensures validation
        );
        if (!updatedTodo) {
            return res.status(404).json({
                message: "Todo not found",
            });
        }
        res.status(200).json({
            message: "Todo updated successfully",
            data: updatedTodo,
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
});

// Delete a todo
router.delete("/:id", async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) {
            return res.status(404).json({
                message: "Todo not found",
            });
        }
        res.status(200).json({
            message: "Todo deleted successfully",
            data: deletedTodo,
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
});

module.exports = router;
