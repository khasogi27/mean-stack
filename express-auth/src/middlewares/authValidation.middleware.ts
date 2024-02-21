import { Request, Response, NextFunction } from 'express';
import { validator } from '../utils/validate';
import { asyncHandlerFix } from '../helpers/asyncHandler';

export const registerValidation = asyncHandlerFix(async (req: Request, res: Response, next: NextFunction) => {
  const validateRule = {
    "fullName": "required|string|min:3",
    "email": "required|email",
    "password": "required|min:6",
  };

  await validator(req.body, validateRule, {}, (err: any, status: any) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  }).catch(err => console.log(err));
});

export const loginValidation = asyncHandlerFix(async (req: Request, res: Response, next: NextFunction) => {
  const validateRule = {
    "email": "required|email", 
    "password":"required|min:6",
  }

  await validator(req.body, validateRule, {}, (err: any, status: any) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  }).catch(err => console.log(err));
});