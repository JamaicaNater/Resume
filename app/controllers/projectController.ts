import type { Request, Response } from 'express';
import Project from '../models/project';

export const ProjectController = {
    getAllProjects: async (req: Request, res: Response) => {
        try {
          const projects = await Project.find();
          res.json(projects);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'An error occurred while fetching projects.' });
        }
      },

    createProject: async (req: Request, res: Response) => {
    try {
        const { name, link, details, tags, from, to, priority } = req.body;
        const project = new Project({ name, link, details, tags, from, to, priority });
        const resJson = await project.save();
        res.json(resJson);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating a project.' });
    }
    },
};

export default ProjectController;
