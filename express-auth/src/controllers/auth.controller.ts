import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { userModel } from '@/models/user.model';
import { v4 as uuidv4 } from 'uuid';
import { comparePassword, signToken } from '@/helpers/index.helper';
import { TResponseStatus, IResponseJson } from '@/interfaces/response.interface';
import { IUser } from '@/interfaces/user.interface';

export class AuthController {
  
  static register(req: Request, res: Response): void {
    const reqBody: IUser = req.body;

    userModel.findOne({ email: reqBody.email })
      .then((user: IUser | null) => {
        if (user) {
          res.status(401 as TResponseStatus).json({
            code: 1,
            message: 'Validation failed',
            result: { errors: { email: ['Email already used'] } }
          } as IResponseJson);
        } else {
          const userId: string = uuidv4();
          const role: string = 'client';
          
          bcrypt.hash(reqBody.password, 10)
            .then((hash) => {
              const user = new userModel({ 
                userId, 
                fullName: reqBody.fullName, 
                email: reqBody.email, 
                role, 
                password: hash 
              });
    
              user.save()
                .then((data: IUser) => {
                  res.status(200 as TResponseStatus).json({
                    code: 0,
                    message: 'User successfuly created!', 
                    result: { datas: {
                      userId: data.userId,
                      fullName: data.fullName,
                      email: data.email,
                      role: data.role
                    }}
                  } as IResponseJson);
                }).catch((error: any) => {
                  res.status(500).json({ error });
                });
            });
        }
      }).catch((error: any) => {
        res.status(412 as TResponseStatus).send({ code: 1, message: error.message } as IResponseJson);
      });
  }

  static login(req: Request, res: Response): void {
    const reqBody: IUser = req.body;

    userModel.findOne({ email: reqBody.email })
      .then((user: IUser | null) => {
        if (!user) {
          res.status(401 as TResponseStatus).json({ 
            code: 1, 
            message: 'Validation failed', 
            result: { errors: { email: ['Authenticion Email Failed'] } } 
          } as IResponseJson);
        } else if (!comparePassword(reqBody.password, user.password)) {
          res.status(401 as TResponseStatus).json({ 
            code: 1, 
            message: 'Validation failed', 
            result: { errors: { email: ['Authenticion Password Failed'] } } 
          } as IResponseJson);
        } else {
          const accessToken = signToken({ userId: user.userId, email: user.email });
          res.status(200 as TResponseStatus).json({ 
            code: 0, 
            message: 'User successfuly login!', 
            result: { datas: { 
              accessToken, 
              userId: user.userId, 
              fullName: user.fullName, 
              role: user.role, 
              email: user.email 
            } }
          } as IResponseJson);
        }
      }).catch((error: any) => {
        res.status(401 as TResponseStatus).json({ code: 1, message: error.message } as IResponseJson);
      });
  }

}
