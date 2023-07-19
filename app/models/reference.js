const mongoose = require('mongoose');

let peopleFields = require('./peopleFields')

const ReferenceSchema = new mongoose.Schema({
    ...peopleFields,
    relationship: {type: String, required: false }
})

// No duplicate first AND last name
ReferenceSchema.index({ firstName: 1, lastName: 1 }, { unique: true });

const Reference = mongoose.model('Reference', ReferenceSchema);

module.exports = Reference;