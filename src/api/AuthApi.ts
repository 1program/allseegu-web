import { LoginRequest, LoginResponse } from "@/models/auth";
import { ApiResponse } from "@/models/common";
import BaseApi from "./BaseApi";

export interface LoginOptions {
  data: LoginRequest;
}

export default class AuthApi extends BaseApi {
  login = ({ data }: LoginOptions) =>
    this.request<ApiResponse<LoginResponse>>({ url: "/login", method: "POST", data });

  logout = () => this.request<ApiResponse>({ url: "/logout", method: "GET" });
}
