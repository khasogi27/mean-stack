import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import userModel from '../models/user.model';
import { v4 as uuidv4 } from 'uuid';
import { comparePassword } from '../helpers/bcrypt';
import { signToken } from '../helpers/jwt';
import { asyncHandlerFix } from '../helpers/asyncHandler';
import { IUser } from '../interfaces/user.interface';


export const register = asyncHandlerFix(async (req: Request, res: Response): Promise<any> => {
  try {
    const reqBody: IUser = req.body;
    const verifyEmail: IUser | null = await userModel.findOne({ email: reqBody.email });

    if (verifyEmail) {
      return res.status(403).json({ message: 'Email already used' });
    } else {
      const userId = uuidv4();
      
      bcrypt.hash(reqBody.password, 10)
        .then((hash) => {
          const user = new userModel({ 
            userId, 
            fullName: reqBody.fullName, 
            email: reqBody.email, 
            role: 'client', 
            password: hash 
          });

          user.save()
            .then((result: any) => {
              return res.status(201).json({ message: 'User successfuly created!', result, success: true });
            }).catch((error: any) => {
              res.status(500).json({ error });
            });
        }).catch((err) => {
          return res.status(412).send({ success: false, message: err.message });
        });
    }
  } catch (error: any) {
    return res.status(412).send({ success: false, message: error.message })
  }
});

export const login = asyncHandlerFix(async (req: Request, res: Response): Promise<any> => {
  try {
    const reqBody: IUser = req.body;
    const getUser: IUser | null = await userModel.findOne({ email: reqBody.email });

    if (!getUser) {
      return res.status(401).json({ message: 'Authenticion Email Failed' });
    } else if (!comparePassword(reqBody.password, getUser.password)) {
      return res.status(401).json({ message: 'Authenticion Password Failed' });
    } else {
      const accessToken = signToken({ userId: getUser.userId, email: getUser.email });
      return res.status(200).json({ accessToken, userId: getUser.userId });
    }
  } catch (error: any) {
    return res.status(401).json({ message: error.message, success: false });
  }
});
