const mongoose = require('mongoose');

let PostSchema = new mongoose.Schema({
    title: String,
    body: String,
    dateCreated: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    creator: { type: String, default: "unknown" }
});

mongoose.model('Post', PostSchema);