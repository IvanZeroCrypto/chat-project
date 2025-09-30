import { create } from "zustand";
import RoomService from "../http/services/RoomService";
import type { IRoom } from "../types/roomResponse/roomResponse";
import axios from "axios";

interface IRoomStore {
  rooms: IRoom[];
  loading: {
    getRooms: boolean;
    createRoom: boolean;
    deleteUserRoom: boolean;
  };
  getRooms: () => Promise<void>;
  createRoom: (name: string) => Promise<void>;
  deleteUserRoom: (roomId: string, userId: string) => Promise<void>;
}

const roomStore = create<IRoomStore>((set) => ({
  rooms: [],
  loading: {
    getRooms: false,
    createRoom: false,
    deleteUserRoom: false,
  },
  getRooms: async () => {
    try {
      set({ loading: { ...roomStore.getState().loading, getRooms: true } });
      const { data, status } = await RoomService.getRooms();
      if (data || status === 200) {
        set({
          loading: { ...roomStore.getState().loading, getRooms: false },
          rooms: data,
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        set({ loading: { ...roomStore.getState().loading, getRooms: false } });
      }
    }
  },
  createRoom: async (name) => {
    try {
      set({ loading: { ...roomStore.getState().loading, createRoom: true } });
      const { status, data } = await RoomService.createRoom(name);
      if (data || status === 200) {
        set({
          loading: { ...roomStore.getState().loading, createRoom: false },
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        set({
          loading: { ...roomStore.getState().loading, createRoom: false },
        });
      }
    }
  },
  deleteUserRoom: async (roomId, userId) => {
    try {
      set({
        loading: { ...roomStore.getState().loading, deleteUserRoom: true },
      });
      const { data, status } = await RoomService.deleteUserRoom(roomId, userId);
      if (data && status === 200) {
        set({
          loading: { ...roomStore.getState().loading, deleteUserRoom: false },
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        set({
          loading: { ...roomStore.getState().loading, deleteUserRoom: false },
        });
      }
    }
  },
}));

export default roomStore;
