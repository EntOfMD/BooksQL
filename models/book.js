const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String,
    createdAt: { type: Date, default: Date.now }
});

// const BookModel = mongoose.model('Books', BookSchema);
// module.exports = BookModel;

module.exports = mongoose.model('Books', BookSchema);
