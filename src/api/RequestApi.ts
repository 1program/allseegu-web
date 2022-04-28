import { ApiResponse, PagedList } from "@/models/common";
import { Request, RequestInput, RequestDetail } from "@/models/request";

import BaseApi from "./BaseApi";

export interface RequestListOptions {
  take?: number;
  page?: number;
}

export interface RequestDetailOptions {
  request_id: number;
}

export interface RequestCreateOptions {
  input: RequestInput;
}

export interface RequestDeleteOptions {
  request_id: number;
}

export interface RequestUpdateOptions {
  request_id: number;
  input: RequestInput;
}

export class RequestApi extends BaseApi {
  /**
   * 올려주세요 요청 목록
   */
  list = async (options: RequestListOptions) =>
    this.request<ApiResponse<PagedList<Request>>>({
      method: "GET",
      url: "/request",
      params: options,
    });

  /**
   * 올려주세요 상세
   */
  detail = async (options: RequestDetailOptions) =>
    this.request<ApiResponse<RequestDetail>>({
      method: "GET",
      url: `/request/${options.request_id}`,
    });

  /**
   * 올려주세요 삭제
   */
  delete = async (options: RequestDeleteOptions) =>
    this.request<ApiResponse>({
      method: "DELETE",
      url: `/request/${options.request_id}`,
    });

  /**
   * 올려주세요 등록
   */
  create = async (options: RequestCreateOptions) =>
    this.request<ApiResponse<Request>>({
      method: "POST",
      url: `/request`,
      data: options.input,
    });

  /**
   * 올려주세요 수정
   */
  update = async (options: RequestUpdateOptions) =>
    this.request<ApiResponse<Request>>({
      method: "PUT",
      url: `/request/${options.request_id}`,
      data: options.input,
    });
}
