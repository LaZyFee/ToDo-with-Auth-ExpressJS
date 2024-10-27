const express = require("express");
const router = express.Router();
const {
    createTodo,
    getTodos,
    getActiveTodos,
    updateTodo,
    deleteTodo,
    updateTodoStatus,
    completeTodo,
    getCompleteTodos
} = require("../Controllers/todoController");

// Get all active todos 
router.get("/active", getActiveTodos);

// Get all todos
router.get("/todos", getTodos);

// Complete a todo
router.patch("/:id/complete", completeTodo);

router.get("/complete", getCompleteTodos);

// Post a todo
router.post("/create", createTodo);

// Put (update) a todo
router.put("/:id/update", updateTodo);

// Update todo status by id
router.put("/:id/status", updateTodoStatus);

// Delete a todo
router.delete("/:id", deleteTodo);

module.exports = router;
