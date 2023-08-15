import { Response } from 'express';

const handleError = (res: Response, error: any, modelName: string, uniqueKey: string) => {
    if (error.name === "MongoServerError" && error.code === 11000) {
        return res.status(409).json({ error: `${modelName} with ${uniqueKey} already exists` });
    }

    return res.status(500).json({ error: 'An error occurred while geting creating user object.' });
}

export default handleError