import { Comment } from "@/models/comment";
import { ApiResponse, PagedList, PageParams } from "@/models/common";
import { Story } from "@/models/story";

import BaseApi from "./BaseApi";

export default class PostApi extends BaseApi {
  storyList = (options: PageParams) =>
    this.request<ApiResponse<PagedList<Story>>>({
      method: "GET",
      url: "/post/story",
      params: options,
    });

  commentList = (options: PageParams) =>
    this.request<ApiResponse<PagedList<Comment<Story>>>>({
      method: "GET",
      url: "/post/comment",
      params: options,
    });
}
