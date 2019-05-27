const mongoose = require('mongoose');
const { Schema } = mongoose;

const authorSchema = new Schema({
    name: String,
    age: Number,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Authors', authorSchema);
