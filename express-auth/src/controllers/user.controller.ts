import { Request, Response } from 'express';
import userModel from '../models/user.model';
import { IUser } from '../interfaces/user.interface';
import { asyncHandlerFix } from '../helpers/asyncHandler';


export const userProfile = asyncHandlerFix(async (req: Request, res: Response) => {
  try {
    const reqParams = req.params;
    const getUser: IUser | null = await userModel.findOne({ userId: reqParams.userId });

    if (!getUser) {
      return res.status(403).json({ 
        code: 1,
        message: "User not found", 
      });
    } else {
      return res.status(200).json({ 
        code: 0,
        message: `User ${getUser.fullName}`, 
      });
    }
  } catch (error: any) {
    return res.status(401).json({ 
      code: 1,
      message: error.message,
    });
  }
});

export const usersList = asyncHandlerFix(async (req: Request, res: Response) => {
  try {
    const users = await userModel.find();

    if (!users) {
      return res.status(403).json({
        code: 1, 
        message: "Data not found", 
      });
    } else {
      return res.status(200).json({ 
        code: 0,
        data: users, 
        message: "Users list", 
      });
    }
  } catch (error: any) {
    return res.status(401).json({ 
      code: 1,
      message: error.message,
    });
  }
});

export const removeUser = asyncHandlerFix(async (req: Request, res: Response) => {
  const reqParams = req.params;

  try {
    const deleteUser = await userModel.findOneAndDelete({ userId: reqParams.userId });

    if (!deleteUser) { 
      return res.status(403).json({
        code: 1, 
        message: "User not found", 
      });
    } else {
      return res.status(200).json({ 
        code: 0,
        message: `Delete user ${deleteUser.fullName}`, 
      });
    }
  } catch (error: any) {
    return res.status(412).send({ 
      code: 1,
      message: error.message,
    });
  }
});