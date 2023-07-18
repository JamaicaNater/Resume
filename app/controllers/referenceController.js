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
            let { first_name, last_name, phone_number, email, relationship } = req.body;
            const reference = new Reference({ first_name, last_name, phone_number, email, relationship });
            reference.save();
        } catch(error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while creating reference.' });
        }
    }
};

module.exports = ReferenceController;