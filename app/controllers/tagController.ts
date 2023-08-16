import type { Request, Response } from 'express';
import Tag from '../models/tag';
import { ErrorHandler, mongoQueryFromQueryParams } from './helpers';

const TagController = {
    getTags: async (req: Request, res: Response) => {
        try {
            const params = await mongoQueryFromQueryParams(req.query);
            const tags = await Tag.find(params);
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
            return ErrorHandler.post(res, error, "Tag");
        }
    }
}

export default TagController;
