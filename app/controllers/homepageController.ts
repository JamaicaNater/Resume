import type { Request, Response } from 'express';

const HomepageController = {
    displayHomepage: (req: Request, res: Response) => {
        return res.send('Welcome to my Smart-Resume!');
    }
};

export default HomepageController;
