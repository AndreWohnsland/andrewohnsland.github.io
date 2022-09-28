import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler';
import User from '../models/user.model';
import { siteTypes } from '../interfaces/cookiePolicy.types';

export type TokenProps = {
  id: string;
};

// Only returns 401 if interrupt is set to true
// either ways sets req.params.authenticated if user is authenticated or not
export default (interruptRequest = true) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    req.body.authenticated = false;
    const isDev = process.env.ENVIRONMENT_TYPE === 'dev';
    const cookiePolicy = isDev ? { sameSite: siteTypes.lax } : { sameSite: siteTypes.none, secure: true };
    try {
      const token = req.cookies.jwt;
      const tokenDetails = jwt.verify(token, process.env.JWT_SECRET as jwt.Secret) as TokenProps;
      const foundUser = await User.findById(tokenDetails.id);
      if (foundUser === null) {
        res.cookie('jwt', '', { httpOnly: true, maxAge: 0, ...cookiePolicy });
        if (interruptRequest) return next(new AppError('Invalid token data', 401));
        return next();
      }
      req.body.authenticated = true;
    } catch (error) {
      if (interruptRequest) return next(new AppError('Authentication failed', 401));
    }
    return next();
  };
};
