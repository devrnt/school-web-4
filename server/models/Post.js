const mongoose = require('mongoose');

let PostSchema = new mongoose.Schema({
    title: String,
    body: String,
    dateCreated: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 }
});

mongoose.model('Post', PostSchema);