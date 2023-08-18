import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    link: {type: String, required: false},
    details: { type: [String], required: false },
    tags: {type: [String], required: false},
    from: {type: Date, require: false},
    to: {type: Date, require: false},
    priority: {type: Number, require: false},
});

const Project = mongoose.model('Project', projectSchema);

export default Project;