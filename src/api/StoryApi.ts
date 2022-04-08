import { ApiResponse, ContentType, PagedList, PageParams } from "@/models/common";
import { Story, StoryData, StoryDetail } from "@/models/story";
import BaseApi, { BaseApiOptions } from "./BaseApi";
import FileApi from "./FileApi";

export interface StoryListOptions extends PageParams {
  redev_id: number;
}

export interface StoryCreateOptions {
  redev_id: number;
  data: StoryData;
}

export interface StoryDetailOptions {
  redev_id: number;
  story_id: number;
}

/**
 * 우리 구역 이야기 API
 */
export default class StoryApi extends BaseApi {
  constructor(options: BaseApiOptions, private readonly fileApi: FileApi) {
    super(options);
  }

  /**
   * 목록
   */
  list = ({ redev_id, ...params }: StoryListOptions) =>
    this.request<ApiResponse<PagedList<Story>>>({
      url: `/${redev_id}/story`,
      method: "GET",
      params,
    });

  /**
   * 상세
   */
  detail = ({ redev_id, story_id }: StoryDetailOptions) =>
    this.request<ApiResponse<StoryDetail>>({
      method: "GET",
      url: `/${redev_id}/story/${story_id}`,
    });

  /**
   * 등록
   */
  create = async ({ redev_id, data }: StoryCreateOptions) =>
    this.request<ApiResponse<Story>>({
      method: "POST",
      url: `/${redev_id}/story`,
      data: {
        content_type: ContentType.PLAIN,
        is_visible: 1,
        ...data,
        uploadFiles: await this.fileApi.upload(data.uploadFiles),
      },
    });
}
