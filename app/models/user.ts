import mongoose from 'mongoose';

import { peopleFields, IPeopleFields } from './peopleFields';

// Todo make for all types
interface IUser extends Document, IPeopleFields {
    username: string,
    skills?: string[];
    details?: string;
}

const UserSchema = new mongoose.Schema({
    ...peopleFields,
    email: { type: String, required: true, unique: true, immutable: true },
    username: {type: String, required: true, unique: true, immutable: true },
    skills: {type: [String], required: false },
    details: {type: String, required: false }
})

UserSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
