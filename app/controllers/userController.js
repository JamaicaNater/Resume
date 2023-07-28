const User = require('../models/user');

const UserController = {
    getUser: async (req, res) => {
        try {
            const user = await User.findOne();
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while geting me object.' });
        }
    },
    postUser: async (req, res) => {
        try {
            const { firstName, lastName, phoneNumber, email, skills, summary } = req.body;
            const me = new User({ firstName, lastName, phoneNumber, email, skills, summary });
            me.save();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while geting creating me object.' });
        }
    }
}

module.exports = UserController;