const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    status: {
        type: String,
        enum: ["active", "inactive"],
    },
    date: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
});

// Instance methods
todoSchema.methods = {
    findActive: function () {
        return this.model("Todo").find({ status: "active" });
    },

    findActiveCallback: function (cb) {
        return this.model("Todo").find({ status: "active" }, cb);
    }
};

// Static methods
todoSchema.statics = {
    findByJs: function () {
        return this.find({ title: /js/i });
    }
};

// Query helpers
todoSchema.query = {
    byLanguage: function (language) {
        return this.find({ title: new RegExp(language, "i") });
    }
};

module.exports = todoSchema;
