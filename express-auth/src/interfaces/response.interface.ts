import { IUser } from "./user.interface";

export interface IProfile {
  accessToken?: string;
  userId: string;
  fullName: string;
  email: string;
  role: string;
}

export interface IError {
  email?: string[];
  password?: string[];
}

export interface IResponseJson {
  code: 0 | 1;
  message: string;
  result: {
    datas?: IProfile | IUser[]
    errors?: IError
  }
}

export type TResponseStatus = 200 | 201 | 403 | 412 | 401 | 500;