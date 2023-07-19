const Me = require('../models/me');

const MeController = {
    getMe: async (req, res) => {
        try {
            const me = await Me.findOne();
            res.json(me);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while geting me object.' });
        }
    },
    postMe: async (req, res) => {
        try {
            const { firstName, lastName, phoneNumber, email, skills, summary } = req.body;
            const me = new Me({ firstName, lastName, phoneNumber, email, skills, summary });
            me.save();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while geting creating me object.' });
        }
    }
}

module.exports = MeController;