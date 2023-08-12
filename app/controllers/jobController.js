const Job = require('../models/job');

const JobController = {
    getJob: async (req, res) => {
        try {
            const job = await Job.find();
            res.json(job);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while geting job object.' });
        }
    },
    postJob: async (req, res) => {
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

module.exports = JobController;