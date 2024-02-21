import { verifyToken } from '../helpers/jwt';
import { NextFunction, Request, Response } from 'express';
import { asyncHandlerFix } from '../helpers/asyncHandler';

export const createJwt = asyncHandlerFix(async (req: Request, res: Response, next: NextFunction) => {
 try {
    const token: string | undefined = req.headers.authorization?.replace("Bearer ", "");
    const decoded = verifyToken(token!);
    req.body['loggedInUser'] = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
});