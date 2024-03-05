export interface IProfile {
  accessToken?: string;
  userId: string;
  fullName: string;
  email: string;
  role: string;
}

export interface IUser extends IProfile {
  password: string;
}

export interface IError {
  fullName?: string,
  email?: string;
  password?: string;
}

export interface IPostResponse {
  code: 0 | 1;
  message: string;
  result: {
    datas?: IProfile | IUser
    errors?: IError
  }
}

export type TResponseStatus = 200 | 201 | 403 | 412 | 401 | 500;
