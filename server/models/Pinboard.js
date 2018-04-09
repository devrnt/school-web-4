const mongoose = require('mongoose');

let PinboardSchema = new mongoose.Schema({
    city: String,
    location: {
        longitude: Number,
        latitude: Number
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
});

mongoose.model('Pinboard', PinboardSchema);