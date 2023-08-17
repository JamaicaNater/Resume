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

        if (error.name === "ValidationError") {
            const validationErrors = Object.keys(error.errors).map(field => ({
                field,
                message: error.errors[field].message
            }));
            return res.status(400).json({ error: "Validation failed", validationErrors });
        }
    
        return res.status(500).json({ error: `An error occurred while creating ${modelName} object.` });
    }
}

export const mongoQueryFromQueryParams = async (query: Request['query']) => {
    let mongoQuery: any = {...query};
    delete mongoQuery.username;
    if (query.username) {
        const username = query.username;
        const user = await User.findOne({username: username});
        if (!user) {
            console.log(`User with username: ${username} not found`);
        }
        mongoQuery['userId'] = user?._id;
    }

    return mongoQuery;
}