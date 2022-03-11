import { LoginRequest, LoginResponse } from "@/models/auth";
import { ApiResponse } from "@/models/common";
import BaseApi from "./BaseApi";

export interface LoginOptions {
  request: LoginRequest;
}

export default class AuthApi extends BaseApi {
  login = ({ request }: LoginOptions) =>
    this.request<ApiResponse<LoginResponse>>({ url: "/login", method: "POST", body: request });

  logout = () => this.request<ApiResponse>({ url: "/logout", method: "GET" });
}
