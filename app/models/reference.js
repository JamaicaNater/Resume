const mongoose = require('mongoose');

let peopleFields = require('./peopleFields')

const ReferenceScema = new mongoose.Schema({
    ...peopleFields,
    relationship: {type: String, required: false }
})

const Reference = mongoose.model('Reference', ReferenceScema);

module.exports = Reference;