import type { Response, Request } from 'express';
import User from '../models/user';

export const ErrorHandler = {
    get: (res: Response, error: any, modelName: string) => {    
        return res.status(500).json({ error: `An error occurred while getting ${modelName} object.` });
    },

    post: (res: Response, error: any, modelName: string) => {
        if (error.name === "MongoServerError" && error.code === 11000) {
            return res.status(409).json({ error: `${modelName} already exists` });
        }
    
        return res.status(500).json({ error: `An error occurred while creating ${modelName} object.` });
    }
}

export const mongoQueryFromQueryParams = async (query: Request['query']) => {
    let mongoQuery: any = {};
    if (query.userEmail) {
        const email = query.userEmail;
        const user = await User.findOne({email: email});
        if (!user) {
            console.log(`User with email: ${email} not found`);
        }
        mongoQuery['userId'] = user?._id;
    }

    return mongoQuery;
}