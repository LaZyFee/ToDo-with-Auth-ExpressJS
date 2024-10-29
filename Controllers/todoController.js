const Todo = require("../schemas/todoSchema");
const createTodo = async (req, res) => {
    try {
        const { title, description, date } = req.body;
        const userId = req.userId;

        // Create new todo with user association
        const newTodo = new Todo({
            title,
            description,
            status: "active",
            date,
            user: userId,
        });

        const savedTodo = await newTodo.save();
        res.status(201).json({
            message: "Todo created successfully",
            data: savedTodo,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const getTodos = async (req, res) => {
    try {
        const userId = req.userId;
        const todos = await Todo.find({ user: userId });
        res.status(200).json({
            message: "Todos retrieved successfully",
            data: todos,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getActiveTodos = async (req, res) => {
    try {
        const userId = req.userId;
        const todos = await Todo.find({ user: userId, status: "active" });
        res.status(200).json({
            message: "Active todos retrieved successfully",
            data: todos,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const completeTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        const updatedTodo = await Todo.findOneAndUpdate(
            { _id: id, user: userId },
            {
                status: "complete",
                completedAt: new Date(),
            },

            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found or unauthorized" });
        }

        res.status(200).json({
            message: "Todo marked as complete",
            data: updatedTodo,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getCompleteTodos = async (req, res) => {
    try {
        const userId = req.userId;
        const todos = await Todo.find({ user: userId, status: "complete" });
        res.status(200).json({
            message: "Completed todos retrieved successfully",
            data: todos,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




const updateTodo = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;
        const { title, description } = req.body;

        const existingTodo = await Todo.findOne({ _id: id, user: userId });

        if (!existingTodo) {
            return res.status(404).json({ message: "Todo not found or unauthorized" });
        }

        const updates = {};

        if (title && existingTodo.title !== title) {
            updates.title = title; // Update title if it has changed
        }

        if (description && existingTodo.description !== description) {
            updates.description = description; // Update description if it has changed
        }

        if (Object.keys(updates).length > 0) {
            updates.date = new Date(); // Update date to current time
        }

        // Update the todo
        const updatedTodo = await Todo.findOneAndUpdate(
            { _id: id, user: userId },
            { ...updates },
            { new: true }
        );

        res.status(200).json({
            message: "Todo updated successfully",
            data: updatedTodo,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const deleteTodo = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;

        const deletedTodo = await Todo.findOneAndDelete({ _id: id, user: userId });

        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found or unauthorized" });
        }

        res.status(200).json({
            message: "Todo deleted successfully",
            data: deletedTodo,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateTodoStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const userId = req.userId;

        if (!["active", "complete"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const updatedTodo = await Todo.findOneAndUpdate(
            { _id: id, user: userId },
            { status },
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found or unauthorized" });
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
    updateTodoStatus,
    completeTodo,
    getCompleteTodos
}