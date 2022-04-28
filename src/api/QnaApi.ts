import { ApiResponse, PagedList } from "@/models/common";
import { Qna, QnaDetail } from "@/models/qna";
import { QnaInput } from "@/models/qna/QnaInput";
import { QnaType } from "@/models/qna/QnaType";

import BaseApi, { BaseApiOptions } from "./BaseApi";
import FileApi from "./FileApi";

export interface QnaListOptions {
  take?: number;
  page?: number;
  type_id?: number;
}

export interface QnaDetailOptions {
  qna_id: number;
}

export interface QnaDeleteOptions {
  qna_id: number;
}

export interface QnaCreateOptions {
  input: QnaInput;
}

export interface QnaUpdateOptions {
  qna_id: number;
  input: QnaInput;
}

export class QnaApi extends BaseApi {
  constructor(options: BaseApiOptions, private readonly fileApi: FileApi) {
    super(options);
  }

  /**
   * QNA 타입 목록
   */
  types = async () =>
    this.request<ApiResponse<QnaType[]>>({
      method: "GET",
      url: "/qna-type",
    });

  /**
   * QNA 목록
   */
  list = async (options: QnaListOptions) =>
    this.request<ApiResponse<PagedList<Qna>>>({
      method: "GET",
      url: "/qna",
      params: options,
    });

  /**
   * QNA 상세
   */
  detail = async (options: QnaDetailOptions) =>
    this.request<ApiResponse<QnaDetail>>({
      method: "GET",
      url: `/qna/${options.qna_id}`,
    });

  /**
   * QNA 삭제
   */
  delete = async (options: QnaDeleteOptions) =>
    this.request<ApiResponse>({
      method: "DELETE",
      url: `/qna/${options.qna_id}`,
    });

  /**
   * QNA 등록
   */
  create = async (options: QnaCreateOptions) =>
    this.request<ApiResponse<Qna>>({
      method: "POST",
      url: `/qna`,
      data: {
        ...options.input,
        uploadFiles: await this.fileApi.upload(options.input.uploadFiles),
      },
    });

  /**
   * QNA 수정
   */
  update = async (options: QnaUpdateOptions) =>
    this.request<ApiResponse<Qna>>({
      method: "PUT",
      url: `/qna/${options.qna_id}`,
      data: options.input,
    });
}
