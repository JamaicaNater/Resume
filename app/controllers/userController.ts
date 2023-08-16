import type { Request, Response } from 'express';
import User from '../models/user';
import { ErrorHandler, mongoQueryFromQueryParams } from './helpers';

const UserController = {
    getMe: async (req: Request, res: Response) => {
        try {
            const user = await User.findById(req.session.user?.id);
            res.json(user);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'An error occurred while getting user object.' });
        }
    },
    getUsers: async (req: Request, res: Response) => {
        try {
            const params = await mongoQueryFromQueryParams(req.query);
            const users = await User.find(params);
            return res.json(users);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'An error occurred while getting user objects.' });
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
            return ErrorHandler.post(res, error, "User"); 
        }
    }
};

export default UserController;
