const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

let quizSchema = new Schema({
    name: {
        type: String,
        index: true,
    },
    ansi_name: String,
    description: {
        type: String,
        index: true,
    },
    posted_by: {
        id_user: Number,
        user_name: String,
    },
    content: {
        type: String,
        index: true,
    },
    option: [{
        value: String,
        is_true: Boolean,
        explain: String,
    }]
}, {timestamps: true}, {collection: 'quiz'}, {_id: false});

quizSchema.plugin(AutoIncrement);

module.exports = mongoose.model('Quiz', quizSchema);
