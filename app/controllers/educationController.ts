import type { Request, Response } from 'express';
import Education from '../models/education';

const EducationController = {
    getAllEducation: async (req: Request, res: Response) => {
        try {
            const education = await Education.find();
            res.json(education);
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'An error occurred while fetching education.' });
        }
    },
    createEducation: async (req: Request, res: Response) => {
        try {
            const { name, degreeType, major, minor, gpa, details, enrollmentDate, graduationDate, city, state, country } = req.body;
            const education = new Education({ name, degreeType, major, minor, gpa, details, enrollmentDate, graduationDate, city, state, country });
            const resJson = await education.save();
            res.json(resJson);
        } catch(error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while creating an education.' });
        }
    }
};

export default EducationController;