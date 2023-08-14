const User = require('../models/user');

const UserController = {
    getMe: async (req, res) => {
        try {
            const user = await User.findOne({userId: req.session.user.id});
            res.json(user);
        } catch (error) {
            console.error(err)                
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
            if (error.name === "MongoServerError" && error.code === 11000) {
                return res.status(409).json({ error: "Duplicate key error" });
            }
            console.error(error);
            res.status(500).json({ error: 'An error occurred while geting creating user object.' });
        }
    }
}

module.exports = UserController;