import type { Request, Response } from 'express';
import Experience from '../models/experience';

const ExperienceController = {
    getAllExperience: async (req: Request, res: Response) => {
        try {
            const experince = await Experience.find();
            res.json(experince);
        } catch(error) {
            console.error(error)
            res.status(500).json({ error: 'An error occurred while fetching projects.' });
        }
    },

    createExperience: async (req: Request, res: Response) => {
        try {
            const { name, logoLink, position, details, tags, from, to, priority } = req.body
            const experience = new Experience({ name, logoLink, position, details, tags, from, to, priority });
            const resJson = await experience.save();
            res.json(resJson);
        } catch(error) {
            console.error(error)
            res.status(500).json({ error: 'An error occurred while creating project.' });
        }
    }
};

export default ExperienceController;