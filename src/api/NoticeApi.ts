import { ApiResponse, PagedList } from "@/models/common";
import { NoticeDetail, Notice } from "@/models/notice";

import BaseApi from "./BaseApi";

export interface MyNoticeListOptions {
  page?: number;
  take?: number;
}

export interface MyNoticeDetailOptions {
  notice_id: number;
}

export interface NoticeListOptions {
  redev_id: number;
  page?: number;
  take?: number;
}

export interface NoticeDetailOptions {
  redev_id: number;
  notice_id: number;
}

/**
 * 공지사항 API
 */
export default class NoticeApi extends BaseApi {
  /**
   * (전체) 공지사항 목록
   */
  myNoticeList = (options: MyNoticeListOptions) =>
    this.request<ApiResponse<PagedList<Notice>>>({
      method: "GET",
      url: `/my-notice`,
      params: options,
    });

  /**
   * (전체) 공지사항 상세
   */
  myNoticeDetail = (options: MyNoticeDetailOptions) =>
    this.request<ApiResponse<NoticeDetail>>({
      method: "GET",
      url: `/my-notice/${options.notice_id}`,
    });

  /**
   * (사업의) 공지사항 목록
   */
  noticeList = ({ redev_id }: NoticeListOptions) =>
    this.request<ApiResponse<PagedList<Notice>>>({ method: "GET", url: `/${redev_id}/notice` });

  /**
   * (사업의) 공지사항 상세
   */
  noticeDetail = ({ redev_id, notice_id }: NoticeDetailOptions) =>
    this.request<ApiResponse<NoticeDetail>>({
      method: "GET",
      url: `/${redev_id}/notice/${notice_id}`,
    });
}
