import { computed, reactive } from "vue";
import { useInfiniteQuery } from "vue-query";

import { Comment } from "@/models/comment";
import { PagedList } from "@/models/common";
import { Story } from "@/models/story";

import { useApi } from "../common/useApi";
import { useMe } from "../user/useMe";

// TODO: Key naming 고민
// TODO: 댓글쓰면 invalidate
export function useMyCommentList() {
  const me = useMe();

  const api = useApi();

  const query = useInfiniteQuery<PagedList<Comment<Story>>>({
    queryKey: computed(() => ["MY_COMMENT_LIST", me.data?.id]),
    queryFn: (context) =>
      api.post
        .commentList({
          take: 20,
          page: context.pageParam,
        })
        .then((result) => result.data),
    getNextPageParam: (lastPage) => lastPage.next_page,
    getPreviousPageParam: (firstPage) => firstPage.prev_page,
  });

  return reactive(query);
}
