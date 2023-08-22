import type { Request, Response } from 'express';
import type { GoogleUser } from '../entity/user'
import axios from 'axios';
import User from '../models/user';
import { ErrorHandler } from './helpers';
import { verifyToken } from '../middleware/helpers';


const AuthController = {
    authenticate: async (req: Request, res: Response) => {
        try {
            console.log(`session: ${req.session?.id}`)

            const token = req.query.code as string | undefined;
            if (!token) {
                res.status(400).json("Code is required");
                return;
            }

            console.log('Authenticating request')
            let user = await verifyToken(token)
            if (!user) {
                throw Error("Failed to verify token")
            }
    
            const account = await User.findOne({ email: user.email });
            if (!account) {
                return res.status(404).json(user)
            }
            
            req.session.user = { ...user, id: account._id.toString(), username: account.username };
            return res.status(account ? 200 : 404).json(req.session.user)
        } catch (error) {
            console.error(error)
            return res.status(500).json("Failed to autheticate")
        }
    },
    logout: (req: Request, res: Response) => {
        req.session.destroy((error) => {
            if (error) {
                console.error('Error destroying session:', error);
                return res.status(500).json({ message: 'Failed to log out' });
            }
            return res.status(200).json({ message: 'Logged out successfully' });
        });
    },
    register: async (req: Request, res: Response) => {
        try {
            const { firstName, lastName, username, phoneNumber, email, skills, details } = req.body;
            const user = new User({ firstName, lastName, username, phoneNumber, email, skills, details });
            const resJson = await user.save();
            if (req.session.user) {
                req.session.user.id = resJson._id.toString();
                req.session.user.username = resJson.username;
            }
            res.json(resJson);
        } catch (error) {
            console.error(error);
            return ErrorHandler.post(res, error, "User"); 
        }
    },
}

export default AuthController;