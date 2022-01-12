
const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    book_name:{
        type: String,
        required: true
    },
    ISBN: {
        type: Number,
        required: true
    },
    author: String,
    price: {
        type: Number,
        required: true,
        default: 0
    },
    img:
    {
        type: String
    }
});

module.exports = bookSchema;