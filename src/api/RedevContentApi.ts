import { ApiResponse, PagedList } from "@/models/common";
import { Redev } from "@/models/redev";
import BaseApi from "./BaseApi";

/**
 * 사업 컨텐츠 API
 */
export default class RedevContentApi extends BaseApi {
  /**
   * 컨텐츠 조회
   */
  redevContent = () =>
    this.request<ApiResponse<PagedList<Redev>>>({ url: "/redev-content", method: "GET" });
}
