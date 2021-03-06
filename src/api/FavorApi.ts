import { ApiResponse } from "@/models/common";
import { Favor, FavorInput } from "@/models/favor";

import BaseApi from "./BaseApi";

export interface FavorOptions {
  id: number;
}

export interface FavorCreateOptions {
  data: FavorInput;
}

export interface FavorUpdateOptions {
  id: number;
  data: FavorInput;
}

export interface FavorDeleteOptions {
  id: number;
}

export default class FavorApi extends BaseApi {
  /**
   * 내 관심 구역 목록
   */
  favorList = () =>
    this.request<ApiResponse<Favor[]>>({
      method: "GET",
      url: `/favor`,
    });

  /**
   * 내 관심 구역 상세
   */
  favor = (options: FavorOptions) =>
    this.request<ApiResponse<Favor>>({
      method: "GET",
      url: `/favor/${options.id}`,
    });

  /**
   * 관심구역 등록
   */
  createFavor = (options: FavorCreateOptions) =>
    this.request<ApiResponse<Favor>>({
      method: "POST",
      url: `/favor`,
      data: options.data,
    });

  /**
   * 관심구역 수정
   */
  updateFavor = (options: FavorUpdateOptions) =>
    this.request<ApiResponse<Favor>>({
      method: "PATCH",
      url: `/favor/${options.id}`,
      data: options.data,
    });

  /**
   * 관심구역 삭제
   */
  deleteFavor = (options: FavorDeleteOptions) =>
    this.request<ApiResponse<Favor>>({
      method: "DELETE",
      url: `/favor/${options.id}`,
    });
}
