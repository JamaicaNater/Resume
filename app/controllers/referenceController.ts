import type { Request, Response } from 'express';
import Reference from '../models/reference';
import { ErrorHandler, mongoQueryFromQueryParams } from './helpers';

const ReferenceController = {
    getAllReferences: async (req: Request, res: Response) => {
        try {
            const params = await mongoQueryFromQueryParams(req.query);
            const references = await Reference.find(params);
            return res.json(references);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'An error occurred while fetching references.' });
        }
    },
    updateReference: async (req: Request, res: Response) => {
        const { id } = req.params;
        const newData = req.body;
      
        try {
          const updatedReference = await Reference.findOneAndUpdate({ _id: id, userId: req.session.user?.id }, newData, { new: true });
      
          if (updatedReference) {
            res.json(updatedReference);
          } else {
            res.status(404).json({ message: 'Reference record not found' });
          }
        } catch (error) {
          console.error(error);
          return ErrorHandler.post(res, error, "Reference");
        }
    },
    createReference: async (req: Request, res: Response) => {
        try {
            let { firstName, lastName, phoneNumber, email, relationship } = req.body;
            const reference = new Reference({ firstName, lastName, phoneNumber, email, relationship, userId: req.session.user?.id });
            const resJson = await reference.save();
            return res.json(resJson);
        } catch(error) {
            console.error(error);
            return ErrorHandler.post(res, error, "Reference");
        }
    }
};

export default ReferenceController;
