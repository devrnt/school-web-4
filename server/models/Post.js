const mongoose = require('mongoose');

let PostSchema = new mongoose.Schema({
    title: String,
    body: String,
    dateCreated: { type: Date, default: Date.now }
});

mongoose.model('Post', PostSchema);