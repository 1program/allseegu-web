import { ApiResponse, PagedList } from "@/models/common";
import { News, NewsType, NewsTypeInfo } from "@/models/news";
import BaseApi from "./BaseApi";

export interface NewsListOptions {
  redev_id: number;
  type_id: NewsType;
  page?: number;
  take?: number;
}

/**
 * 뉴스 API
 */
export class NewsApi extends BaseApi {
  /**
   * 뉴스 타입 목록
   */
  newsTypes = () =>
    this.request<ApiResponse<NewsTypeInfo[]>>({
      method: "GET",
      url: `/news-type`,
    });

  /**
   * 뉴스 목록
   */
  newsList = ({ redev_id, ...params }: NewsListOptions) =>
    this.request<ApiResponse<PagedList<News>>>({
      url: `/${redev_id}/news`,
      method: "GET",
      params,
    });
}
