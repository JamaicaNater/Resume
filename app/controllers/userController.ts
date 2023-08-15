import type { Request, Response } from 'express';
import User from '../models/user';
import handleError from './helpers';

const UserController = {
    getMe: async (req: Request, res: Response) => {
        try {
            const user = await User.findById(req.session.user?.id);
            res.json(user);
        } catch (error) {
            console.error(error)                
            return res.status(500).json({ error: 'An error occurred while geting user object.' });
        }
    },
    getUsers: async (req: Request, res: Response) => {
        try {
            const user = await User.find();
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while geting user object.' });
        }
    },
    postUser: async (req: Request, res: Response) => {
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

export default UserController;
