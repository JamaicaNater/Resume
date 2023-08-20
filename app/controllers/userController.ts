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
            const params = {...req.query};
            const users = await User.find(params);
            return res.json(users);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'An error occurred while getting user objects.' });
        }
    },
    updateMe: async (req: Request, res: Response) => {
        const newData = req.body;
      
        try {
          const updatedUser = await User.findByIdAndUpdate(req.session.user?.id, newData, { new: true });
      
          if (updatedUser) {
            res.json(updatedUser);
          } else {
            res.status(404).json({ message: 'User record not found' });
          }
        } catch (error) {
          console.error(error);
          return ErrorHandler.post(res, error, "User"); 
        }
    },
    updateUser: async (req: Request, res: Response) => {
        const { id } = req.params;
        const newData = req.body;
      
        try {
          const updatedUser = await User.findByIdAndUpdate(id, newData, { new: true });
      
          if (updatedUser) {
            res.json(updatedUser);
          } else {
            res.status(404).json({ message: 'User record not found' });
          }
        } catch (error) {
          console.error(error);
          return ErrorHandler.post(res, error, "User"); 
        }
    },
    postUser: async (req: Request, res: Response) => {
        try {
            const { firstName, lastName, username, phoneNumber, email, tags, details } = req.body;
            const user = new User({ firstName, lastName, username, phoneNumber, email, tags, details });
            const resJson = await user.save();
            res.json(resJson);
        } catch (error) {
            console.error(error);
            return ErrorHandler.post(res, error, "User"); 
        }
    },
};

export default UserController;
