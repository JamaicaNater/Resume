let Education = require('../models/education');

let EducationController = {
    getAllEducation: async (req, res) => {
        try {
            const education = await Education.find();
            res.json(education);
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'An error occurred while fetching education.' });
        }
    },
    createEducation: async (req, res) => {
        try {
            const { name, degreeType, major, minor, gpa, details, enrollmentDate, graduationDate, city, state, country } = req.body;
            const education = new Education({ name, degreeType, major, minor, gpa, details, enrollmentDate, graduationDate, city, state, country });
            await education.save();
            res.json(education);
        } catch(error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while creating an education.' });
        }
    }
};

module.exports = EducationController;