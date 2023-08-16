import type { Request, Response } from 'express';
import Project from '../models/project';

export const ProjectController = {
    getAllProjects: async (req: Request, res: Response) => {
        try {
          const projects = await Project.find();
          return res.json(projects);
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: 'An error occurred while fetching projects.' });
        }
      },

    createProject: async (req: Request, res: Response) => {
    try {
        const { name, link, details, tags, from, to, priority } = req.body;
        const project = new Project({ name, link, details, tags, from, to, priority });
        const resJson = await project.save();
        return res.json(resJson);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while creating a project.' });
    }
    },
};

export default ProjectController;
