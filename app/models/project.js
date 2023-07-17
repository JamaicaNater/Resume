const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    details: { type: [String], required: true },
    tags: {type: [String], required: true},
    from: {type: Date, require: false},
    to: {type: Date, require: false},
    priority: {type: Number, require: false},
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;