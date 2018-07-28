const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let quizSchema = new Schema({
    content: {
        type: String,
        index: true,
    },
    level: {
        type: Number,
        index: true,
    },
    options: [{
        value: String,
        is_true: Boolean,
        explain: String,
    }]
}, {timestamps: true}, {collection: 'quiz'});

module.exports = mongoose.model('Quiz', quizSchema);
