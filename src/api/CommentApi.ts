import { ApiResponse } from "@/models/common";
import { Comment, CommentData } from "@/models/comment";

import BaseApi, { BaseApiOptions } from "./BaseApi";
import FileApi from "./FileApi";

export interface CommentCreateOptions {
  parent_uuid: string;
  comment_id: number | null;
  model: "story";
  data: CommentData;
}

export interface CommentUpdateOptions {
  id: number;
  parent_uuid: string;
  comment_id: number | null;
  model: "story";
  data: CommentData;
}

export interface CommentDeleteOptions {
  id: number;
  parent_uuid: string;
  model: "story"; // Cache Update를 위해 필요한 필드
  commentable_id: number; // Cache Update를 위해 필요한 필드
}

export default class CommentApi extends BaseApi {
  constructor(options: BaseApiOptions, private readonly fileApi: FileApi) {
    super(options);
  }

  /**
   * 댓글 작성
   */
  create = async ({ parent_uuid, comment_id, model, data }: CommentCreateOptions) =>
    this.request<ApiResponse<Comment>>({
      method: "POST",
      url: `/${parent_uuid}/comment`,
      params: {
        comment_id,
        model,
      },
      data: {
        ...data,
        uploadFiles: await this.fileApi.upload(data.uploadFiles),
      },
    });

  /**
   * 댓글 수정
   */
  update = async ({ parent_uuid, id, comment_id, data }: CommentUpdateOptions) =>
    this.request<ApiResponse<Comment>>({
      method: "PATCH",
      url: `/${parent_uuid}/comment/${id}`,
      params: {
        comment_id,
      },
      data: {
        ...data,
        uploadFiles: await this.fileApi.upload(data.uploadFiles),
      },
    });

  /**
   * 삭제
   */
  delete = (options: CommentDeleteOptions) =>
    this.request<ApiResponse>({
      method: "DELETE",
      url: `/${options.parent_uuid}/comment/${options.id}`,
    });
}
