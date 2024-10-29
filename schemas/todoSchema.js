const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    status: {
        type: String,
        enum: ["active", "complete"],
    },
    date: {
        type: Date,
        default: Date.now,
    },
    completedAt: { type: Date, default: null },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("Todo", todoSchema);