const mongoose = require('mongoose');

const JobSchema = mongoose.Schema({
    name: {type: String, required: true},
    tags: {type: [String], required: true},
});

// No duplicate school name AND major AND degree type
JobSchema.index({ name: 1 }, { unique: true });

const Job = mongoose.model('Job', JobSchema);

module.exports = Job;