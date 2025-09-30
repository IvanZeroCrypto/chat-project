import { create } from "zustand";
import FriendService from "../http/services/FriendService";
import type {
  IlistMyFriends,
  IRequestFriendResponse,
} from "../types/authresponse/friendResponse";
import axios from "axios";

interface IFriendStore {
  listFriendRequestToMy: IRequestFriendResponse[];
  listFriendRequestSent: IRequestFriendResponse[];
  listMyFriends: IlistMyFriends[];
  loading: boolean;
  FriendRequestToMy: () => Promise<void>;
  FriendRequestSent: () => Promise<void>;
  getAllMyFriends: () => Promise<void>;
  friendRequestConfirmation: (id: number, fromId: string) => Promise<void>;
}

const friendStore = create<IFriendStore>((set) => ({
  listFriendRequestToMy: [],
  listFriendRequestSent: [],
  listMyFriends: [],
  loading: false,

  FriendRequestToMy: async () => {
    try {
      set({ loading: true });
      const { data, status } = await FriendService.getFriendlyRequestToMe();
      if (data || status === 200) {
        set({
          listFriendRequestToMy: data,
          loading: false,
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        set({
          loading: false,
        });
      }
    }
  },
  FriendRequestSent: async () => {
    try {
      set({ loading: true });
      const { data, status } = await FriendService.getFriendlyRequestSent();
      if (data || status === 200) {
        set({
          listFriendRequestSent: data,
          loading: false,
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        set({
          loading: false,
        });
      }
    }
  },
  getAllMyFriends: async () => {
    try {
      set({ loading: true });
      const { data, status } = await FriendService.getAllMyFriends();
      if (data || status === 200) {
        const friendList = data?.friends.map((friend) => ({
          ...friend,
          isOnline: false,
        }));
        set({
          listMyFriends: friendList,
          loading: false,
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        set({
          loading: false,
        });
      }
    }
  },
  friendRequestConfirmation: async (id, fromId) => {
    try {
      set({ loading: true });
      await FriendService.addFriend(id, fromId);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        set({
          loading: false,
        });
      }
    }
  },
}));

export default friendStore;
