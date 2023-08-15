import { unless } from "express-unless";
import type { Request, Response, NextFunction } from 'express';
import type { GoogleUser } from '../entity/user'

declare module 'express-session' {
  interface SessionData {
    user?: GoogleUser;
  }
}

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    console.log(`session: ${req.session.id}`);
    if (req.session && req.session.user) {

      console.log('authenticated')
      next();
    } else {
        console.log("Failed to authenticate")
        res.status(401).json("Unauthorized");
    }
};

requireAuth.unless = unless;

export default requireAuth; 
