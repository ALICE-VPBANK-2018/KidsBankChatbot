const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let documentSchema = new Schema({
    content: {
        type: String,
    },
    summarization: {
        type: String,
    },
    keywords: {
        type: String,
    }
}, {timestamps: true}, {collection: 'document'});

module.exports = mongoose.model('Document', documentSchema);
