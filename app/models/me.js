let mongoose = require('mongoose');

let peopleFields = require('./peopleFields')

const meSchema = new mongoose.Schema({
    ...peopleFields,
    skills: {type: [String], required: false },
    summary: {type: String, required: false }
})

// No duplicate first AND last name
meSchema.index({ firstName: 1, lastName: 1 }, { unique: true });

const Me = mongoose.model('Me', meSchema);

module.exports = Me;