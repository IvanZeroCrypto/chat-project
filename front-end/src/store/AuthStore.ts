import { create } from "zustand";
import AuthService from "../http/services/AuthService";
import type { IUser } from "../types/User";
import axios from "axios";
import type { ICheckAuthResponse } from "../types/authresponse/checkAuthResponse";

interface IAuthStore {
  isAuth: boolean | null | string;
  user: IUser;
  loading: {
    register: boolean;
    login: boolean;
    logout: boolean;
    checkAuth: boolean;
  };
  error: string;
  cleanError: () => void;
  setError: (error: string) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (
    userName: string,
    email: string,
    password: string
  ) => Promise<void>;
  checkAuth: () => Promise<
    { status: number; data: ICheckAuthResponse } | undefined
  >;
  logout: () => Promise<void>;
}

const authStore = create<IAuthStore>((set) => ({
  isAuth: localStorage.getItem("accessToken"),
  user: {} as IUser,
  loading: {
    register: false,
    login: false,
    logout: false,
    checkAuth: false,
  },
  error: "",
  cleanError: () => {
    set({ error: "" });
  },
  setError: (error) => {
    set({ error: error });
  },
  login: async (email, password) => {
    set({
      loading: { ...authStore.getState().loading, login: true },
      isAuth: false,
      user: {} as IUser,
      error: "",
    });
    try {
      const { status, data } = await AuthService.login(email, password);
      if (status === 200 && data) {
        localStorage.setItem("accessToken", data.accessToken);
        set({
          loading: { ...authStore.getState().loading, login: false },
          isAuth: true,
          user: data.user,
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        set({
          loading: { ...authStore.getState().loading, login: false },
          error: error?.message,
        });
      }
    }
  },
  register: async (userName: string, email: string, password: string) => {
    set({
      loading: { ...authStore.getState().loading, register: true },
      isAuth: false,
      error: "",
    });
    try {
      const { data, status } = await AuthService.register(
        userName,
        email,
        password
      );
      if (status === 200 && data) {
        set({ loading: { ...authStore.getState().loading, register: false } });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        set({
          loading: { ...authStore.getState().loading, register: false },
          error: error?.message,
        });
      }
    }
  },
  checkAuth: async () => {
    set({
      loading: { ...authStore.getState().loading, checkAuth: true },
      error: "",
    });
    try {
      const { status, data } = await AuthService.checkAuth();
      if (status === 200 && data) {
        set({
          loading: { ...authStore.getState().loading, checkAuth: false },
          isAuth: true,
          user: data.user,
        });
      } else if (status === 204) {
        localStorage.removeItem("accessToken");
      }
      return {
        status,
        data,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        set({
          loading: { ...authStore.getState().loading, checkAuth: false },
          error: error?.message,
        });
      }
    }
  },
  logout: async () => {
    try {
      set({ loading: { ...authStore.getState().loading, logout: true } });
      const { status } = await AuthService.logout();
      if (status === 200) {
        set({
          loading: { ...authStore.getState().loading, logout: false },
          isAuth: false,
          user: {} as IUser,
        });
        localStorage.removeItem("accessToken");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        set({
          loading: { ...authStore.getState().loading, logout: false },
          error: error?.message,
        });
      }
    }
  },
}));

export default authStore;
