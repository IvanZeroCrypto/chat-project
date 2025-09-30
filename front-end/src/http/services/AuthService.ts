import { api } from "..";
import type { AxiosResponse } from "axios";
import type { ILoginResponse } from "../../types/authresponse/LoginResponse";
import type { ICheckAuthResponse } from "../../types/authresponse/checkAuthResponse";

export default class AuthService {
  static async register(
    userName: string,
    email: string,
    password: string
  ): Promise<AxiosResponse<{ message: string }>> {
    return api.post("/register", { userName, email, password });
  }
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<ILoginResponse>> {
    return api.post("/login", { email, password });
  }
  static async logout(): Promise<AxiosResponse<{ message: string }>> {
    return api.get("/logout");
  }
  static async checkAuth(): Promise<AxiosResponse<ICheckAuthResponse>> {
    return api.get("/check-auth");
  }
  static async refresh(): Promise<AxiosResponse<{ accessToken: string }>> {
    return api.get("/refresh");
  }
}
