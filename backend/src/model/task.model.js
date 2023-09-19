const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 200,
        trim: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'ongoing', 'completed'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
});

taskSchema.pre('save', function (next) {
    if (this.isModified()) {
        this.updatedAt = Date.now();
    }
    next();
});

taskSchema.pre('findOneAndUpdate', function (next) {
    this._update.updatedAt = Date.now();
    next();
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;