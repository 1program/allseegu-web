import { LoginResponse } from "@/models/auth";
import { ApiResponse } from "@/models/common";
import BaseApi from "./BaseApi";

export default class AuthApi extends BaseApi {
  login = () => this.request<ApiResponse<LoginResponse>>({ url: "/login", method: "POST" });

  logout = () => this.request<ApiResponse>({ url: "/logout", method: "GET" });
}
