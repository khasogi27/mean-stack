import { Request, Response, NextFunction } from 'express';
import { IResponseJson, TResponseStatus } from '@/interfaces/response.interface';
import { validator } from '@/utils/index.util';


export class AuthValidation {
  
  static registerValidation(req: Request, res: Response, next: NextFunction): void {
    const validateRule = {
      "fullName": "required|string|min:3",
      "email": "required|email",
      "password": "required|min:6",
    };
  
    validator(req.body, validateRule, {}, (err: any, status: any) => {
      if (!status) {
        res.status(412 as TResponseStatus).send({ code: 1, message: 'Validation failed', result: err } as IResponseJson);
      } else {
        next();
      }
    }).catch(err => console.log(err));
  };
  
  static loginValidation(req: Request, res: Response, next: NextFunction): void {
    const validateRule = {
      "email": "required|email", 
      "password":"required|min:6",
    }
  
    validator(req.body, validateRule, {}, (err: any, status: any) => {
      if (!status) {
        res.status(412 as TResponseStatus).send({ code: 1, message: 'Validation failed', result: err } as IResponseJson);
      } else {
        next();
      }
    }).catch(err => console.log(err));
  };

}