import type { IUserMinimal } from "../User";

export interface IMessage {
  id?: string;
  text: string;
  userId?: string;
  roomId?: string;
  createdAt: Date | string;
  user: IUserMinimal;
}

export interface IRoom {
  id: string;
  name: string;
  ownerId?: string;
  private?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  messages?: IMessage[];
  users?: IUserMinimal[];
  admins?: IUserMinimal[];
  owner?: IUserMinimal | null;
}
