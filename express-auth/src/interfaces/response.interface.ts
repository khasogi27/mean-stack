import { IResultErrUserJson, IUser } from './user.interface';

interface IResultDataJson {
  userId: string,
  accessToken: string,
}

export interface IRespJson { 
  code: 0 | 1, 
  message: string, 
  result?: { errors: IResultErrUserJson } | { datas: IResultDataJson | IUser } 
};

export type TRespStatus = 200 | 201 | 403 | 412 | 401 | 500;