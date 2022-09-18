const { Schema, model } = require('mongoose');


const PostSchema = Schema({
    title: {
        type: String,
        require: true,
        unique: true
    },
    description: {
        type: String,
        require: true,
    },
    published_at: {
        type: Date,
        require: true
    },
    user_id: {
        type: Number,
        require: true,
    }
});

module.exports = model('Post', PostSchema);

