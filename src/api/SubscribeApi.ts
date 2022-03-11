import { ApiResponse, PagedList } from "@/models/common";
import { Subscribe } from "@/models/subscribe";
import BaseApi from "./BaseApi";

export interface SubscribeListOptions {
  revId: number;
}

export interface SubscribeDetailOptions {
  revId: number;
  subscribeId: number;
}

/**
 * 구독 API
 */
export default class SubscribeApi extends BaseApi {
  /**
   * (사업의) 구독 목록
   */
  subscribeList = ({ revId }: SubscribeListOptions) =>
    this.request<ApiResponse<PagedList<Subscribe>>>({ url: `/${revId}/subscribe`, method: "GET" });

  /**
   * (사업의) 구독 상세
   */
  subscribeDetail = ({ revId, subscribeId }: SubscribeDetailOptions) =>
    this.request<ApiResponse<PagedList<Subscribe>>>({
      url: `/${revId}/subscribe/${subscribeId}`,
      method: "GET",
    });
}
