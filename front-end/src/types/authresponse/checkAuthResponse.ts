import type { IUser } from "../User";

export interface ICheckAuthResponse {
  user: IUser;
}

export interface ICheckAuthStore {
  data: ICheckAuthResponse;
  status: number;
}
