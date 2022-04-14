import { LoginResponse } from "@/models/auth";
import { ApiResponse } from "@/models/common";
import { User, UserRegisterInput, UserUpdateInput } from "@/models/user";
import BaseApi from "./BaseApi";

export interface UserUpdateOptions {
  id: number;
  data: UserUpdateInput;
}

export interface UserDeleteOptions {
  id: number;
}

export interface UserDuplicateOptions {
  field: "email" | "nickname";
  value: string;
}

export default class UserApi extends BaseApi {
  me = () =>
    this.request<ApiResponse<User>>({
      method: "GET",
      url: "/me",
    });

  register = (options: UserRegisterInput) =>
    this.request<ApiResponse<LoginResponse>>({
      method: "POST",
      url: "/register",
      data: options,
    });

  update = (options: UserUpdateOptions) =>
    this.request<ApiResponse<User>>({
      method: "PATCH",
      url: `/user/${options.id}`,
      data: options.data,
    });

  delete = (options: UserDeleteOptions) =>
    this.request<ApiResponse>({
      method: "DELETE",
      url: `/user/${options.id}`,
    });

  duplicate = (options: UserDuplicateOptions) =>
    this.request<ApiResponse>({
      method: "POST",
      url: `/user/duplicate/${options.field}`,
      params: {
        value: options.value,
      },
    });
}
