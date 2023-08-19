import type { Request, Response } from 'express';
import Project from '../models/project';
import { ErrorHandler, mongoQueryFromQueryParams } from './helpers';

export const ProjectController = {
    getAllProjects: async (req: Request, res: Response) => {
        try {
          const params = await mongoQueryFromQueryParams(req.query);
          const projects = await Project.find(params);
          return res.json(projects);
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: 'An error occurred while fetching projects.' });
        }
    },
    updateProject: async (req: Request, res: Response) => {
      const { id } = req.params;
      const newData = req.body;
    
      try {
        const updatedProject = await Project.findOneAndUpdate({ _id: id, userId: req.session.user?.id }, newData, { new: true });
    
        if (updatedProject) {
          res.json(updatedProject);
        } else {
          res.status(404).json({ message: 'Project record not found' });
        }
      } catch (error) {
        console.error(error)
        return ErrorHandler.post(res, error, "Project");
      }
  },
  createProject: async (req: Request, res: Response) => {
  try {
      const { name, link, details, tags, from, to, priority } = req.body;
      const project = new Project({ name, link, details, tags, from, to, priority, userId: req.session.user?.id });
      const resJson = await project.save();
      return res.json(resJson);
  } catch (error) {
      console.error(error);
      return ErrorHandler.post(res, error, "Project");
  }
  },
};

export default ProjectController;
