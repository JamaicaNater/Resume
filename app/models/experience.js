const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    // TODO: Support native images
    companyName: { type: String, required: true },
    logoLink: {type: String, required: false},
    position: {type: String, required: true},
    details: { type: [String], required: true },
    tags: {type: [String], required: true},
    from: {type: Date, require: false},
    to: {type: Date, require: false},
    priority: {type: Number, require: false},
});

// No duplicate company name AND position
experienceSchema.index({ companyName: 1, position: 1 }, { unique: true });

const Experience = mongoose.model('Experience', experienceSchema);

module.exports = Experience;