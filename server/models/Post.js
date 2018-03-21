const mongoose = require('mongoose');

let PostSchema = new mongoose.Schema({
    title: String,
    body: String,
    dateCreated: Date
});

mongoose.model('Post', PostSchema);