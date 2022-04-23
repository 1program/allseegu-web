import { ApiResponse, PagedList } from "@/models/common";
import { Subscribe, SubscribeDetail } from "@/models/subscribe";

import BaseApi from "./BaseApi";

export interface SubscribeListOptions {
  redev_id: number;
  page?: number;
  take?: number;
}

export interface SubscribeDetailOptions {
  redev_id: number;
  subscribe_id: number;
}

/**
 * 구독 API
 */
export default class SubscribeApi extends BaseApi {
  /**
   * (사업의) 구독 목록
   */
  subscribeList = ({ redev_id }: SubscribeListOptions) =>
    this.request<ApiResponse<PagedList<Subscribe>>>({
      method: "GET",
      url: `/${redev_id}/subscribe`,
    });

  /**
   * (사업의) 구독 상세
   */
  subscribeDetail = ({ redev_id, subscribe_id }: SubscribeDetailOptions) =>
    this.request<ApiResponse<SubscribeDetail>>({
      method: "GET",
      url: `/${redev_id}/subscribe/${subscribe_id}`,
    });
}
