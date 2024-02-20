import { Request, Response, NextFunction } from 'express';
import Validator from 'validatorjs';

export const registerValidation = async (req: Request, res: Response, next: NextFunction) => {
  const validateRule = {
    "fullName": "required|string|min:3",
    "email": "required|email",
    "password": "required|min:6",
  };

  const validator = new Validator(req.body, validateRule);

  try {
    await new Promise<void>((resolve, rejects) => {
      validator.checkAsync((err: any, status: any) => {
        if (!status) {
          res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: err,
          });
          rejects();
        } else {
          resolve();
        }
      });
    });
    next();
  } catch (error) {
    console.log(error);
  }
}

export const loginValidation = async (req: Request, res: Response, next: NextFunction) => {
  const validateRule = {
    "email": "required|email", 
    "password":"required|min:6",
  }

  const validator = new Validator(req.body, validateRule);

  try {
    await new Promise<void>((resolve, rejects) => {
      validator.checkAsync((err: any, status: any) => {
        if (!status) {
          res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: err,
          });
          rejects();
        } else {
          resolve();
        }
      });
    });
    next();
  } catch (error) {
    console.log(error);
  }
}