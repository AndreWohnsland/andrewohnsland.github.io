import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler';
import User from '../models/user.model';
import { siteTypes } from '../interfaces/cookiePolicy.types';

export type TokenProps = {
  id: string;
};

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt;
    const tokenDetails = jwt.verify(token, process.env.JWT_SECRET as jwt.Secret) as TokenProps;
    const isDev = process.env.ENVIRONMENT_TYPE === 'dev';
    const cookiePolicy = isDev ? { sameSite: siteTypes.lax } : { sameSite: siteTypes.none, secure: true };
    const foundUser = await User.findById(tokenDetails.id);
    if (foundUser === null) {
      res.cookie('jwt', '', { httpOnly: true, maxAge: 0, ...cookiePolicy });
      return next(new AppError('Invalid token data', 401));
    }
    next();
  } catch (error) {
    next(new AppError('Authentication failed', 401));
  }
};
