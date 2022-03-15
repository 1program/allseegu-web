import { ApiResponse, PagedList } from "@/models/common";
import { Redev } from "@/models/redev";
import BaseApi from "./BaseApi";

export interface RedevListOptions {
  page?: number;
  take?: number;
}

export interface SearchRedevOptions {
  query?: string;
}

/**
 * 사업 API
 */
export default class RedevApi extends BaseApi {
  /**
   * 사업 목록
   */
  redevList = ({ page, take }: RedevListOptions) =>
    this.request<ApiResponse<PagedList<Redev>>>({
      url: "/redev",
      method: "GET",
      params: { page, take },
    });

  /**
   * 사업 검색
   */
  searchRedev = ({ query }: SearchRedevOptions) =>
    this.request<ApiResponse<Redev[]>>({ url: "/redev/search", method: "POST", params: { query } });
}
