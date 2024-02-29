import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { userModel } from '@/models/user.model';
import { v4 as uuidv4 } from 'uuid';
import { comparePassword, signToken } from '@/helpers/index.helper';
import { asyncHandlerFix } from '@/utils/asyncHandler';
import { TRespStatus, IRespJson } from '@/interfaces/response.interface';
import { IUser } from '@/interfaces/user.interface';


export const register = asyncHandlerFix(async (req: Request, res: Response): Promise<any> => {
  try {
    const reqBody: IUser = req.body;
    const verifyEmail: IUser | null = await userModel.findOne({ email: reqBody.email });

    if (verifyEmail) {
      return res.status(401 as TRespStatus).json({
        code: 1,
        message: 'Validation failed',
        result: { errors: { email: ['Email already used'] } }
      } as IRespJson);
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
            .then((data: any) => {
              return res.status(200 as TRespStatus).json({
                code: 1,
                message: 'User successfuly created!', 
                result: { datas: data }
              } as IRespJson);
            }).catch((error: any) => {
              res.status(500).json({ error });
            });
        });
    }
  } catch (error: any) {
    return res.status(412 as TRespStatus).send({ code: 1, message: error.message } as IRespJson);
  }
});

export const login = asyncHandlerFix(async (req: Request, res: Response): Promise<any> => {
  try {
    const reqBody: IUser = req.body;
    const getUser: IUser | null = await userModel.findOne({ email: reqBody.email });

    if (!getUser) {
      res.status(401 as TRespStatus).json({ 
        code: 1, 
        message: 'Validation failed', 
        result: { errors: { email: ['Authenticion Email Failed'] } } 
      } as IRespJson);
    } else if (!comparePassword(reqBody.password, getUser.password)) {
      res.status(401 as TRespStatus).json({ 
        code: 1, 
        message: 'Validation failed', 
        result: { errors: { email: ['Authenticion Password Failed'] } } 
      } as IRespJson);
    } else {
      const accessToken = signToken({ userId: getUser.userId, email: getUser.email });
      res.status(200 as TRespStatus).json({ 
        code: 0, 
        message: 'User successfuly login!', 
        result: { datas: { 
          accessToken, 
          userId: getUser.userId, 
          fullName: getUser.fullName, 
          role: getUser.role, 
          email: getUser.email 
        } }
      } as IRespJson);
    }
  } catch (error: any) {
    res.status(401 as TRespStatus).json({ code: 1, message: error.message } as IRespJson);
  }
});
