import { Request, Response } from 'express';
import { userModel } from '@/models/user.model';
import { IResponseJson, TResponseStatus } from '@/interfaces/response.interface';
import { IUser } from '@/interfaces/user.interface';

export class UserController {

  static userProfile(req: Request, res: Response): void {    
    userModel.findOne({ userId: req.body['loggedInUser'].userId })
      .then((user: IUser | null) => {
        if (!user) {
          res.status(403 as TResponseStatus).json({ 
            code: 1,
            message: "User not found", 
          } as IResponseJson);
        } else {
          res.status(200 as TResponseStatus).json({ 
            code: 0,
            message: `User ${user.fullName}`, 
            result: { datas: {
              userId: user.userId, 
              fullName: user.fullName, 
              email: user.email, 
              role: user.role, 
            }}
          } as IResponseJson);
        }
      }).catch((error: any) => {
        res.status(401 as TResponseStatus).json({ code: 1, message: error.message } as IResponseJson);
      });
  };
  
  static usersList(req: Request, res: Response): void {
    userModel.findOne({ userId: req.body['loggedInUser'].userId })
      .then((user: IUser | null) => {
        if (user?.role !== 'admin') {
          res.status(403 as TResponseStatus).json({ 
            code: 1,
            message: "Unauthorized", 
          } as IResponseJson);
        } else {
          userModel.find()
            .then((values: IUser[] | null) => {
              if (!values) {
                res.status(403 as TResponseStatus).json({
                  code: 1, 
                  message: "Data not found", 
                } as IResponseJson);
              } else {
                const updatedData = values.map(({ userId, fullName, email, role }) => ({ userId, fullName, email, role }));
                res.status(200 as TResponseStatus).json({ 
                  code: 0,
                  message: "Users list", 
                  result: { datas:  [...updatedData] }
                } as IResponseJson);
              }
            });
        }
      }).catch((error: any) => {
        res.status(401 as TResponseStatus).json({ code: 1, message: error.message } as IResponseJson);
      });
  }
  
  static removeUser (req: Request, res: Response): void {
    const reqParams = req.query;
    
    userModel.findOne({ userId: req.body['loggedInUser'].userId })
      .then((user: IUser | null) => {
        if (user?.role !== 'admin') {
          res.status(403 as TResponseStatus).json({ 
            code: 1,
            message: "Unauthorized", 
          } as IResponseJson);
        } else {
          userModel.findOneAndDelete({ userId: reqParams.userId })
            .then((value: IUser | null) => {
              if (!value) { 
                res.status(403 as TResponseStatus).json({
                  code: 1, 
                  message: "User not found", 
                } as IResponseJson);
              } else {
                res.status(200 as TResponseStatus).json({ 
                  code: 0,
                  message: `Delete user ${user.fullName}`, 
                } as IResponseJson);
              }
            });
        }
      }).catch((error: any) => {
        res.status(412 as TResponseStatus).send({ code: 1, message: error.message } as IResponseJson);
      });
  }
  
  static removeAllUser(req: Request, res: Response): void {
    userModel.deleteMany({ role: 'client' })
      .then((users: any) => {
        if (users.deletedCount == 0) {
          res.status(403 as TResponseStatus).json({
            code: 1, 
            message: "User not found", 
          } as IResponseJson);
        } else {
          res.status(200 as TResponseStatus).json({ 
            code: 0,
            message: `Delete ${users.deletedCount} user`, 
          } as IResponseJson);
        }
      }).catch((error: any) => {
        res.status(412 as TResponseStatus).send({ code: 1, message: error.message } as IResponseJson);
      });
  }
  
}

