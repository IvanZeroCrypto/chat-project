import type { AxiosResponse } from "axios";
import { api } from "..";
import type { IRoom } from "../../types/roomResponse/roomResponse";

export default class RoomService {
  static async getRooms(): Promise<AxiosResponse<IRoom[]>> {
    return api.get("/rooms");
  }
  static async createRoom(
    name: string,
    id: string = ""
  ): Promise<AxiosResponse<{ message: string }>> {
    return api.post("/rooms", { name, id });
  }
  static async addUserRoom(
    roomId: string,
    userId: string
  ): Promise<
    AxiosResponse<{
      id(
        id: any,
        id1: string
      ): { data: any; status: any } | PromiseLike<{ data: any; status: any }>;
      message: string;
    }>
  > {
    return api.post(`/rooms/${roomId}`, { userId });
  }
  static async deleteUserRoom(
    roomId: string,
    userId: string
  ): Promise<AxiosResponse<{ message: string }>> {
    return api.delete(`/rooms/${roomId}?userId=${userId}`);
  }
  static async addAdminRoom(roomId: string, userId: string): Promise<void> {
    return api.post(`/rooms-add-admin/${roomId}`, { userId });
  }
  static async deleteAdminRoom(roomId: string, userId: string): Promise<void> {
    return api.post(`/rooms-delete-admin/${roomId}`, { userId });
  }
  static async updateNameRoom(
    roomId: string,
    newName: string
  ): Promise<AxiosResponse<{ message: string }>> {
    return api.post(`/rooms-update-name/${roomId}`, { newName });
  }
  static async getByIdRoom(roomId: string): Promise<AxiosResponse<IRoom>> {
    return api.get(`/rooms/${roomId}`);
  }
}
