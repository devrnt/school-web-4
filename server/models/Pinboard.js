const mongoose = require('mongoose');
const Location = require('./Location');

let PinboardSchema = new mongoose.Schema({
    city: String,
    location: Location,
    posts: [Object]
});

mongoose.model('Pinboard', PinboardSchema);