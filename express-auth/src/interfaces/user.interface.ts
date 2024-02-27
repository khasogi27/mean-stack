export interface IUser {
  userId: string;
  fullName: string;
  email: string;
  password: string;
  role: string;
}

export interface IResultErrUserJson {
  email?: string[],
  password?: string[]
}
