export interface IUser {
  id: string;
  userName: string;
  email: string;
  identificationId: number;
}

export type IUserMinimal = Pick<IUser, "id" | "userName">;
