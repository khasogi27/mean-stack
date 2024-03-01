import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '@/helpers/jwt';
import { IResponseJson, TResponseStatus } from '@/interfaces/response.interface';
import { doesNotMatch } from 'assert';

export class CreateJsonWebToken {
  
  static createJwt(req: Request, res: Response, next: NextFunction): void {
    const token: string | undefined = req.headers.authorization?.replace("Bearer ", "");
    const decoded = verifyToken(token!)

    if (decoded?.expired) {
      res.status(401 as TResponseStatus).json({ code: 1, message: "Unauthorized! Access Token was expired!" } as IResponseJson);
    } else if (decoded) {
      req.body['loggedInUser'] = decoded;
      next();
    } else {
      res.status(401 as TResponseStatus).json({ code: 1, message: 'Unauthorized' } as IResponseJson);
    }
  }

}