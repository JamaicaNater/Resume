import type { Request, Response } from 'express';
import Reference from '../models/reference';

const ReferenceController = {
    getAllReferences: async (req: Request, res: Response) => {
        try {
            const references = await Reference.find();
            return res.json(references);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'An error occurred while fetching references.' });
        }
    },
    createReference: async (req: Request, res: Response) => {
        try {
            let { firstName, lastName, phoneNumber, email, relationship } = req.body;
            const reference = new Reference({ firstName, lastName, phoneNumber, email, relationship });
            const resJson = await reference.save();
            return res.json(resJson);
        } catch(error) {
            console.error(error);
            return res.status(500).json({ error: 'An error occurred while creating reference.' });
        }
    }
};

export default ReferenceController;
