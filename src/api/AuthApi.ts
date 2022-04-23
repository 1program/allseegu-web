import { LoginRequest, LoginResponse } from "@/models/auth";
import { ApiResponse } from "@/models/common";

import BaseApi from "./BaseApi";

export interface LoginOptions {
  data: LoginRequest;
}

export default class AuthApi extends BaseApi {
  login = ({ data }: LoginOptions) =>
    this.request<ApiResponse<LoginResponse>>({ method: "POST", url: "/login", data });

  logout = () => this.request<ApiResponse>({ method: "GET", url: "/logout" });
}
