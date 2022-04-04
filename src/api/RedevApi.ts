import { ApiResponse, PagedList } from "@/models/common";
import { Redev, RedevDetail, RedevShape } from "@/models/redev";
import BaseApi from "./BaseApi";

export interface RedevListOptions {
  page?: number;
  take?: number;
}

export interface SearchRedevOptions {
  query?: string;
}

export interface RedevGeoSearchOptions {
  sw_lng: number;
  sw_lat: number;
  ne_lng: number;
  ne_lat: number;
}

/**
 * 사업 API
 */
export default class RedevApi extends BaseApi {
  /**
   * 위치 기반 검색
   */
  geoSearch = (options: RedevGeoSearchOptions) =>
    this.request<ApiResponse<RedevShape[]>>({
      url: "/redev/geo-search",
      method: "POST",
      params: options,
    });

  /**
   * 사업 검색
   */
  search = ({ query }: SearchRedevOptions) =>
    this.request<ApiResponse<PagedList<Redev>>>({
      url: "/redev/search",
      method: "POST",
      params: { query },
    });

  /**
   * 핫이슈 목록
   */
  hotIssueList = () =>
    this.request<ApiResponse<Redev[]>>({
      url: "/redev/hotissue",
      method: "GET",
    });

  /**
   * 전체 목록
   */
  list = ({ page, take }: RedevListOptions) =>
    this.request<ApiResponse<PagedList<Redev>>>({
      url: "/redev",
      method: "GET",
      params: { page, take },
    });
}
