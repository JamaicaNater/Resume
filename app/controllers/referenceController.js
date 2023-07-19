let Reference = require('../models/reference');

const ReferenceController = {
    getAllReferences: async (req, res) => {
        try {
            const references = await Reference.find();
            res.json(references);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while fetching references.' });
        }
    },
    createReference: async (req, res) => {
        try {
            let { firstName, lastName, phoneNumber, email, relationship } = req.body;
            const reference = new Reference({ firstName, lastName, phoneNumber, email, relationship });
            reference.save();
        } catch(error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while creating reference.' });
        }
    }
};

module.exports = ReferenceController;