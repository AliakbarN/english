const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wordSchema = new Schema({
    word: {
        type: String,
        required: true,
    },
    translations: {
        type: String
    },
    createdAt: {
        type: Date
    }
}, { timestamps: true });

const Word = mongoose.model('Word', wordSchema);

module.exports = Word;