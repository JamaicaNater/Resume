let mongoose = require('mongoose');

let peopleFields = require('./peopleFields')

const UserSchema = new mongoose.Schema({
    ...peopleFields,
    skills: {type: [String], required: false },
    details: {type: String, required: false }
})

// No duplicate first AND last name
UserSchema.index({ firstName: 1, lastName: 1 }, { unique: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;