import { ApiResponse, PagedList } from "@/models/common";
import { Video } from "@/models/video";
import BaseApi from "./BaseApi";

export interface VideoListOptions {
  redev_id: number;
  page?: number;
  take?: number;
}

/**
 * 비디오 API
 */
export default class VideoApi extends BaseApi {
  /**
   * 비디오 목록
   */
  videoList = ({ redev_id }: VideoListOptions) =>
    this.request<ApiResponse<PagedList<Video>>>({
      url: `/${redev_id}/video`,
      method: "GET",
    });
}
