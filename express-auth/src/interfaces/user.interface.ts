import { IProfile } from "./response.interface";

export interface IUser extends IProfile {
  password: string;
}
