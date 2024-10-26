const Todo = require("../schemas/todoSchema");


const createTodo = async (req, res) => {
    try {
        const { title, description, date } = req.body;

        // Validate required fields
        if (!title || !req.userId) {
            return res.status(400).json({ message: "Title and user ID are required" });
        }

        // Create new todo with user association
        const newTodo = new Todo({
            title,
            description,
            status: "active",
            date,
            user: req.userId,
        });

        const savedTodo = await newTodo.save();
        res.status(201).json({
            message: "Todo created successfully",
            data: savedTodo,
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
};

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json({
            message: "Todos retrieved successfully",
            data: todos,
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
}
const updateTodo = async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
}
const deleteTodo = async (req, res) => {
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
}

const getActiveTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ status: "active" });
        res.status(200).json({
            message: "Active todos retrieved successfully",
            data: todos,
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
}
const updateTodoStatus = async (req, res) => {
    try {
        const { id } = req.params; // Todo ID from request parameters
        const { status } = req.body; // Status from request body, e.g., "complete"

        // Check if the status is either 'active' or 'complete' to maintain allowed values
        if (!["active", "complete"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const updatedTodo = await Todo.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.status(200).json({
            message: "Todo status updated successfully",
            data: updatedTodo,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports = {
    createTodo,
    updateTodo,
    deleteTodo,
    getTodos,
    getActiveTodos,
    updateTodoStatus
}