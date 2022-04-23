import { ApiResponse, PagedList } from "@/models/common";
import { Faq } from "@/models/faq";
import { FaqType } from "@/models/faq/FaqType";

import BaseApi from "./BaseApi";

export interface FaqListOptions {
  take?: number;
  page?: number;
  type_id: number;
}

export interface FaqSearchOptions {
  take?: number;
  page?: number;
  query: string;
}

export class FaqApi extends BaseApi {
  /**
   * FAQ 타입 목록
   */
  types = async () =>
    this.request<ApiResponse<FaqType[]>>({
      method: "GET",
      url: "/faq-type",
    });

  /**
   * FAQ 목록
   */
  list = async (options: FaqListOptions) =>
    this.request<ApiResponse<PagedList<Faq>>>({
      method: "GET",
      url: `/faq`,
      params: options,
    });

  /**
   * FAQ 검색
   */
  search = async (options: FaqSearchOptions) =>
    this.request<ApiResponse<PagedList<Faq>>>({
      method: "POST",
      url: `/faq/search`,
      params: options,
    });
}
