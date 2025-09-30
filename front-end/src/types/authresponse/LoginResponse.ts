import type { IUser } from "../User";

export interface ILoginResponse {
  accessToken: string;
  user: IUser;
}
