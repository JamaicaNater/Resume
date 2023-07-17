const Project = require('../models/project');

const ProjectController = {
    getAllProjects: async (req, res) => {
        try {
          const projects = await Project.find();
          res.json(projects);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'An error occurred while fetching projects.' });
        }
      },

    createProject: async (req, res) => {
    try {
        const { name, link, details, tags, from, to, priority } = req.body;
        const project = new Project({ name, link, details, tags, from, to, priority });
        await project.save();
        res.json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating a project.' });
    }
    },
};

module.exports = ProjectController;