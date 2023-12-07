const {Schema, model} = require('mongoose');

const todoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    descr: {
        type: String,
        default: "",
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = model('Todo', todoSchema);