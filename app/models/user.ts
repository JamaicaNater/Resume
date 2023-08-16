import mongoose from 'mongoose';

import { peopleFields, IPeopleFields } from './peopleFields';

// Todo make for all types
interface IUser extends Document, IPeopleFields {
    skills?: string[];
    details?: string;
}

const UserSchema = new mongoose.Schema({
    ...peopleFields,
    skills: {type: [String], required: false },
    details: {type: String, required: false }
})

UserSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
