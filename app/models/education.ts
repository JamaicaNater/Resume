import mongoose from 'mongoose';

const EducationSchema = new mongoose.Schema({
    name: {type: String, required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    degreeType: {type: String, required: true},
    major: {type: String, required: true},
    minor: {type: String, required: false},
    gpa: {type: Number, required: false},
    details: {type: [String], required: false},
    enrollmentDate: {type: String, required: false},
    graduationDate: {type: String, required: false},
    city: {type: String, required: false},
    state: {type: String, required: false},
    country: {type: String, required: false},
});

// No duplicate school name AND major AND degree type
EducationSchema.index({ name: 1, degreeType: 1, major: 1 }, { unique: true });

const Education = mongoose.model('Education', EducationSchema);

export default Education;