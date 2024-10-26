const express = require("express");
const router = express.Router();
const {
    createTodo,
    getTodos,
    getActiveTodos,
    updateTodo,
    deleteTodo,
    updateTodoStatus
} = require("../Controllers/todoController");

// Get all active todos 
router.get("/active", getActiveTodos);

// Post a todo
router.post("/", createTodo);

// Get all todos
router.get("/", getTodos);

// Put (update) a todo
router.put("/:id", updateTodo);

// Update todo status by id
router.patch("/:id/status", updateTodoStatus);

// Delete a todo
router.delete("/:id", deleteTodo);

module.exports = router;
