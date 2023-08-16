import type { Request, Response } from 'express';
import Job from '../models/job';
import { ErrorHandler, mongoQueryFromQueryParams } from './helpers';

const JobController = {
    getJob: async (req: Request, res: Response) => {
        try {
            const params = await mongoQueryFromQueryParams(req.query);
            const job = await Job.find(params);
            return res.json(job);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'An error occurred while geting job object.' });
        }
    },
    postJob: async (req: Request, res: Response) => {
        try {
            const { name, tags } = req.body;
            const job = new Job({ name, tags });
            const resJson = await job.save();
            return res.json(resJson);
        } catch (error) {
            console.error(error);
            return ErrorHandler.post(res, error, "Job");
        }
    }
}

export default JobController
