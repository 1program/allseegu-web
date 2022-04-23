import { ApiResponse, PagedList } from "@/models/common";
import { Community, CommunityCafeType, CommunityType, CommunityTypeInfo } from "@/models/community";

import BaseApi from "./BaseApi";

export interface CommunityListOptions {
  redev_id: number;
  type_id: CommunityType;
  cafe_type?: CommunityCafeType | null;
  page?: number;
  take?: number;
}

/**
 * 커뮤니티 API
 */
export default class CommunityApi extends BaseApi {
  /**
   * 커뮤니티 타입 목록
   */
  communityTypes = () =>
    this.request<ApiResponse<CommunityTypeInfo[]>>({
      method: "GET",
      url: `/community-type`,
    });

  /**
   * 커뮤니티 목록
   */
  communityList = ({ redev_id, ...params }: CommunityListOptions) =>
    this.request<ApiResponse<PagedList<Community>>>({
      method: "GET",
      url: `/${redev_id}/community`,
      params,
    });
}
