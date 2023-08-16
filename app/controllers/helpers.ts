import type { Response, Request } from 'express';

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

export const mongoQueryFromQueryParams = (userId: string, query: Request['query']) => {
    let mongoQuery = { userId: userId };

    return mongoQuery;
}
