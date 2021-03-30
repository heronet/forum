const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Post must have a title"]
    },
    content: {
        type: String,
        required: [true, "Post cannot be empty"]
    }
});

module.exports = mongoose.model("Post", PostSchema);