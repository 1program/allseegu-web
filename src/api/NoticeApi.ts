import { ApiResponse, PagedList } from "@/models/common";
import { NoticeDetail } from "@/models/notice";
import { Notice } from "@/models/notice/Notice";
import BaseApi from "./BaseApi";

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
   * (사업의) 공지사항 목록
   */
  noticeList = ({ redev_id }: NoticeListOptions) =>
    this.request<ApiResponse<PagedList<Notice>>>({ url: `/${redev_id}/notice`, method: "GET" });

  /**
   * (사업의) 공지사항 상세
   */
  noticeDetail = ({ redev_id, notice_id }: NoticeDetailOptions) =>
    this.request<ApiResponse<NoticeDetail>>({
      url: `/${redev_id}/notice/${notice_id}`,
      method: "GET",
    });
}
