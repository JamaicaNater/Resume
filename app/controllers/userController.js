const User = require('../models/user');

const UserController = {
    getUser: async (req, res) => {
        try {
            const user = await User.findOne();
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while geting user object.' });
        }
    },
    postUser: async (req, res) => {
        try {
            const { firstName, lastName, phoneNumber, email, skills, details } = req.body;
            const user = new User({ firstName, lastName, phoneNumber, email, skills, details });
            const resJson = await user.save();
            res.json(resJson);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while geting creating user object.' });
        }
    }
}

module.exports = UserController;