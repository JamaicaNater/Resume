import mongoose from 'mongoose';

let peopleFields = require('./peopleFields')

const UserSchema = new mongoose.Schema({
    ...peopleFields,
    skills: {type: [String], required: false },
    details: {type: String, required: false }
})

UserSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model('User', UserSchema);

export default User;