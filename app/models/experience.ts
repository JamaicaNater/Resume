import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
    // TODO: Support native images
    name: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    logoLink: {type: String, required: false},
    position: {type: String, required: true},
    details: { type: [String], required: false },
    tags: {type: [String], required: false},
    startDate: {type: Date, require: false},
    endDate: {type: Date, require: false},
    priority: {type: Number, require: false},
});

// No duplicate company name AND position
experienceSchema.index({ companyName: 1, position: 1 }, { unique: true });

const Experience = mongoose.model('Experience', experienceSchema);

export default Experience;