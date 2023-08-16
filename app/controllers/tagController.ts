import type { Request, Response } from 'express';
import Tag from '../models/tag';

const TagController = {
    getTags: async (req: Request, res: Response) => {
        try {
            const tags = await Tag.find();
            return res.json(tags);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'An error occurred while fetching tags.' });
        }
    },
    createTag: async (req: Request, res: Response) => {
        try {
            let { name } = req.body;
            const tag = new Tag({ name });
            const resJson = await tag.save();
            return res.json(resJson);
        } catch(error) {
            console.error(error);
            return res.status(500).json({ error: 'An error occurred while creating tag.' });
        }
    }
}

export default TagController;
