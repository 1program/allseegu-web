import { ApiResponse, PagedList } from "@/models/common";
import { Redev, RedevDetail, RedevGeometry } from "@/models/redev";
import BaseApi from "./BaseApi";

export interface RedevListOptions {
  page?: number;
  take?: number;
}

export interface RedevDetailOptions {
  redev_id: number;
}

export interface RedevSearchOptions {
  query?: string;
  page?: number;
  take?: number;
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
    this.request<ApiResponse<RedevGeometry[]>>({
      url: "/redev/geo-search",
      method: "POST",
      params: options,
    });

  /**
   * 사업 검색
   */
  search = ({ query, page, take = 5 }: RedevSearchOptions) =>
    this.request<ApiResponse<PagedList<Redev>>>({
      url: "/redev/search",
      method: "POST",
      params: { query, page, take },
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

  /**
   * 사업 상세
   */
  detail = ({ redev_id }: RedevDetailOptions) =>
    this.request<ApiResponse<RedevDetail>>({
      url: `/redev/${redev_id}`,
      method: "GET",
    });
}
