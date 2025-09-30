import type { IUserMinimal } from "../User";

export interface IRequestFriendResponse {
  id: number;
  fromId: string;
  toId: string;
  createdAt: string;
  from?: {
    userName: string;
  };
  to?: {
    userName: string;
  };
}

export interface IAllMyFriendsResponse {
  friends: IUserMinimal[];
}

export interface IlistMyFriends {
  id: string;
  userName: string;
  isOnline: boolean;
}
