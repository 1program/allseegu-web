import { ApiResponse } from "@/models/common";
import { User } from "@/models/user";
import BaseApi from "./BaseApi";

export default class UserApi extends BaseApi {
  me = () =>
    this.request<ApiResponse<User>>({
      url: "/me",
      method: "GET",
    });
}
