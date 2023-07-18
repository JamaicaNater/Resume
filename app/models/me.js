let mongoose = require('mongoose');

let peopleFields = require('./peopleFields')

const MeScema = new mongoose.Schema({
    ...peopleFields,
    skills: {type: [String], required: false },
    summary: {type: String, required: false }
})

const Me = mongoose.model('Me', MeScema);

module.exports = Me;