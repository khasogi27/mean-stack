
import { NextFunction, Request, Response } from 'express';
import { IUser } from '@/interfaces/user.interface';
import { asyncHandlerFix } from '@/utils/index.util';
import { verifyToken } from '@/helpers/jwt';
import { userModel } from '@/models/user.model';

export const createJwt = asyncHandlerFix(async (req: Request, res: Response, next: NextFunction) => {
 try {
    const token: string | undefined = req.headers.authorization?.replace("Bearer ", "");
    const decoded = verifyToken(token!);
    const getUser: IUser | null = await userModel.findOne({ userId: decoded.userId });
   
    if (getUser?.role === 'admin') {
      req.body['loggedInUser'] = decoded;
      next();
    } 
    if (getUser?.role !== 'admin') {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
});