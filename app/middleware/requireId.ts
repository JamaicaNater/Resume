import { unless } from "express-unless";
import type { Request, Response, NextFunction } from 'express';
import type { GoogleUser } from '../entity/user'
import User from "../models/user";

declare module 'express-session' {
  interface SessionData {
    user?: GoogleUser;
  }
}

const requireId = async (req: Request, res: Response, next: NextFunction) => {
    console.log(`session: ${req.session.id}`);
    if (req.session && req.session.user && req.session.user.id && await User.findById(req.session.user.id)) {

      console.log('Authorized to post')
      next();
    } else {
        console.log("Unuthorized to post")
        res.status(401).json("User registrion incomplete");
    }
};

requireId.unless = unless;

export default requireId; 
