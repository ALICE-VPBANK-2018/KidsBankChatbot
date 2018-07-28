const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

let tagSchema = new Schema({
    name: {
        type: String,
        index: true,
    },
    ansi_name: String,
    description: {
        type: String,
        index: true,
    },
}, {timestamps: true}, {collection: 'tags'}, {_id: false});

tagSchema.plugin(AutoIncrement);

module.exports = mongoose.model('Tag', tagSchema);
