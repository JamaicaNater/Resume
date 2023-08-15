import type { Request, Response } from 'express';
import Job from '../models/job';

const JobController = {
    getJob: async (req: Request, res: Response) => {
        try {
            const job = await Job.find();
            res.json(job);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while geting job object.' });
        }
    },
    postJob: async (req: Request, res: Response) => {
        try {
            const { name, tags } = req.body;
            const job = new Job({ name, tags });
            const resJson = await job.save();
            res.json(resJson);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while geting creating job object.' });
        }
    }
}

export default JobController
