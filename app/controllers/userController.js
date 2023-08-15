const { email } = require('../models/peopleFields');
const User = require('../models/user');
const { handleError } = require('./helpers')

const UserController = {
    getMe: async (req, res) => {
        try {
            const user = await User.findById(req.session.user.id);
            res.json(user);
        } catch (error) {
            console.error(error)                
            return res.status(500).json({ error: 'An error occurred while geting user object.' });
        }
    },
    getUsers: async (req, res) => {
        try {
            const user = await User.find();
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
            return handleError(res, error, 'user', 'email')
        }
    }
}

module.exports = UserController;