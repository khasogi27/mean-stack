import { Request, Response, NextFunction, response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import userModel from '../models/user.model';
import { v4 as uuidv4 } from 'uuid';

const asyncHandlerFix = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => (req: Request, res: Response, next: NextFunction) => Promise.resolve(fn(req, res, next)).catch(next);

export const register = asyncHandlerFix(async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;
  const verifyEmail = await userModel.findOne({ email: email });

  try {
    if (verifyEmail) {
      return res.status(403).json({ message: 'Email already used' });
    } else {
      const userId = uuidv4();
      bcrypt.hash(password, 10)
        .then((hash) => {
          const user = new userModel({ userId, fullName, email, role: 'client', password: hash });
          user.save()
            .then((result: any) => {
              return res.status(201).json({ message: 'user successfuly created!', result, success: true });
            }).catch((err: any) => {
              res.status(500).json({ err });
            });
        }).catch((err) => {
          return res.status(412).send({ success: false, message: err.message });
        });
    }
  } catch (error: any) {
    return res.status(412).send({ success: false, message: error.message })
  }
});

export const login = asyncHandlerFix(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  let getUser!: any;

  userModel.findOne({ email: email })
    .then((user: any): Response<any> | Promise<any> => {
      if (!user) {
        return res.status(401).json({ message: 'Authenticion Failed' });
      }
      getUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((resp) => {
      if (!resp) {
        return res.status(401).json({ message: 'Authenticion Failed' });
      } else {
        let jwtToken = jwt.sign(
          { email: getUser.email, userId: getUser.userId },
          process.env.JWT_SECRET!,
          { expiresIn: '1h' }
        );
        return res.status(200).json({ accessToken: jwtToken, userId: getUser.userId });
      }
    })
    .catch((err) => {
      return res.status(401).json({ message: err.message, success: false });
    });
});

export const userProfile = asyncHandlerFix(async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const verifyUser = await userModel.findOne({ userId: id });
    if (!verifyUser) {
      return res.status(403).json({ message: "user not found", success: false });
    } else {
      return res.status(200).json({ message: `user ${verifyUser.fullName}`, success: true });
    }
  } catch (error: any) {
    return res.status(401).json({ success: false, message: error.message });
  }
});

export const usersList = asyncHandlerFix(async (req: Request, res: Response) => {
  try {
    const users = await userModel.find();
    return res.status(200).json({ data: users, success: true, message: "users list" });
  } catch (error: any) {
    return res.status(401).json({ success: false, message: error.message });
  }
});

export const removeUser = asyncHandlerFix(async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const deleteUser = await userModel.findOneAndDelete({ userId });
    if (!deleteUser) { 
      return res.status(403).json({ message: "user not found", success: false });
    } else {
      return res.status(200).json({ message: `Delete user ${deleteUser.fullName}`, success: true });
    }
  } catch (error: any) {
    return res.status(412).send({ success: false, message: error.message })
  }
});
