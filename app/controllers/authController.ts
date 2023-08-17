import type { Request, Response } from 'express';
import type { GoogleUser } from '../entity/user'
import axios from 'axios';
import User from '../models/user';
import { ErrorHandler } from './helpers';


async function authenticate(authCode: string, redirectUri: string) {
    const tokenEndpoint = 'https://oauth2.googleapis.com/token';

    // Todo: throw error
    const tokenParams = new URLSearchParams();
    tokenParams.append('code', authCode);
    tokenParams.append('client_id', process.env.CLIENT_ID ?? '');
    tokenParams.append('client_secret', process.env.CLIENT_SECRET ?? '');
    tokenParams.append('redirect_uri', redirectUri);
    tokenParams.append('grant_type', 'authorization_code');
    tokenParams.append('scope', '');

    try {
        const response = await axios.post(tokenEndpoint, tokenParams);
        
        return {
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
            expiresIn: response.data.expiresIn,
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error exchanging authorization code for access token:', error.response?.data);
        } else {
            console.error('Unknown error:', error);
        }
        throw error;
    }
}

async function authorize(accessToken: string) {
    try {
        const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const user: GoogleUser = {
            sub: response.data.sub,
            name: response.data.name,
            picture: response.data.picture,
            email: response.data.email,
            emailVerified: response.data.email_verified,
        };
        
        return user;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error fetching user info:', error.response?.data);
        } else {
            console.error('Unknown error:', error);
        }
        throw error;
    }
}

const AuthController = {
    authenticate: async (req: Request, res: Response) => {
        try {
            console.log(`session: ${req.session?.id}`)
            console.log('Authenticating request')

            const authCode = req.query.code as string | undefined;
            const redirectUri = req.query.redirect_uri as string | undefined;

            if (!authCode || !redirectUri) {
                res.status(400).json("Invalid parameters");
                return;
            }

            const token = await authenticate(authCode, redirectUri);
            console.log('Authorizing request')
            let user = await authorize(token.accessToken);
            user
    
            const account = await User.findOne({ email: user.email });

            if (account) {
              user = { ...user, id: account._id.toString(), username: account.username };
            }
            
            req.session.user = user;
            console.log(`welcome ${user.name}`)
            return res.status(account ? 200 : 404).json(user)
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