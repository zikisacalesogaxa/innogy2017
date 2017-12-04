const mongoose = require('mongoose');

const plumberSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cellNumber: Number,
    schedules: {
        type: Array,
        default: []
    }
});

var plumber = mongoose.model('plumbers', plumberSchema);

module.exports = plumber;