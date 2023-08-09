const Tag = require('../models/tag')

const TagController = {
    getTags: async (req, res) => {
        try {
            const tags = await Tag.find();
            res.json(tags);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while fetching tags.' });
        }
    },
    createTag: async (req, res) => {
        try {
            let { name } = req.body;
            const tag = new Tag({ name });
            const resJson = await tag.save();
            res.json(resJson);
        } catch(error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while creating tag.' });
        }
    }
}

module.exports = TagController