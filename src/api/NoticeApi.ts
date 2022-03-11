import { ApiResponse, PagedList } from "@/models/common";
import { Notice } from "@/models/notice/Notice";
import BaseApi from "./BaseApi";

export interface NoticeListOptions {
  revId: number;
}

export interface NoticeDetailOptions {
  revId: number;
  noticeId: number;
}

/**
 * 공지사항 API
 */
export default class NoticeApi extends BaseApi {
  /**
   * (사업의) 공지사항 목록
   */
  noticeList = ({ revId }: NoticeListOptions) =>
    this.request<ApiResponse<PagedList<Notice>>>({ url: `/${revId}/notice`, method: "GET" });

  /**
   * (사업의) 공지사항 상세
   */
  noticeDetail = ({ revId, noticeId }: NoticeDetailOptions) =>
    this.request<ApiResponse<Notice>>({ url: `/${revId}/notice/${noticeId}`, method: "GET" });
}
