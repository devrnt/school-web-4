const mongoose = require('mongoose');

let LocationSchema = new mongoose.Schema({
    longitude: Number,
    latitude: Number,
    posts: Object
});

mongoose.model('Location', LocationSchema);