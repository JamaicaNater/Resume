import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
    name: {type: String, required: true},
    tags: {type: [String], required: true},
});

// No duplicate school name AND major AND degree type
JobSchema.index({ name: 1 }, { unique: true });

const Job = mongoose.model('Job', JobSchema);

export default Job;