import type { AxiosResponse } from "axios";
import { api } from "..";
import type { IUserMinimal } from "../../types/User";
import type {
  IAllMyFriendsResponse,
  IRequestFriendResponse,
} from "../../types/authresponse/friendResponse";

export default class FriendService {
  static async getFriendlyRequestToMe(): Promise<
    AxiosResponse<IRequestFriendResponse[]>
  > {
    return api.get("/friendly-request-my");
  }
  static async getFriendlyRequestSent(): Promise<
    AxiosResponse<IRequestFriendResponse[]>
  > {
    return api.get("/friendly-request-sent");
  }
  static async searchUser(
    searchId: string
  ): Promise<AxiosResponse<IUserMinimal>> {
    return api.get(`/search-user/${searchId}`);
  }
  static async friendRequest(
    id: string
  ): Promise<AxiosResponse<{ message: string }>> {
    return api.post(`/friend-request/${id}`);
  }
  static async deleteFriendRequest(
    id: number
  ): Promise<AxiosResponse<{ message: string }>> {
    return api.delete(`/friend-request/${id}`);
  }
  static async addFriend(id: number, fromId: string): Promise<void> {
    return api.post(`/add-friend/${id}`, { fromId });
  }
  static async deleteFriend(
    id: string
  ): Promise<AxiosResponse<{ message: string }>> {
    return api.delete(`/delete-friend/${id}`);
  }
  static async getAllMyFriends(): Promise<
    AxiosResponse<IAllMyFriendsResponse>
  > {
    return api.get("/friends");
  }
}
