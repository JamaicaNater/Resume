const mongoose = require('mongoose');

const experinceSchema = new mongoose.Schema({
    // TODO: Support native images
    companyName: { type: String, required: true },
    logoLink: {type: String, required: true},
    position: {type: String, required: true},
    details: { type: [String], required: true },
    tags: {type: [String], required: true},
    from: {type: Date, require: false},
    to: {type: Date, require: false},
    priority: {type: Number, require: false},
});

const Experience = mongoose.model('Experience', experinceSchema);

module.exports = Experience;