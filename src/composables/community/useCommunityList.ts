import { computed, reactive, Ref } from "vue";
import { useInfiniteQuery } from "vue-query";

import { CommunityListOptions } from "@/api/CommunityApi";
import { PagedList } from "@/models/common";
import { Community } from "@/models/community";

import { useApi } from "../common/useApi";

export function useCommunityList(options: Ref<CommunityListOptions>) {
  const api = useApi();

  const query = useInfiniteQuery<PagedList<Community>>({
    queryKey: computed(() => [
      "COMMUNITY_LIST",
      options.value.redev_id,
      options.value.type_id,
      options.value.cafe_type,
    ]),
    queryFn: (context) =>
      api.community
        .communityList({
          take: 20,
          ...options.value,
          page: context.pageParam,
        })
        .then((result) => result.data),
    getNextPageParam: (lastPage) => lastPage.next_page,
    getPreviousPageParam: (firstPage) => firstPage.prev_page,
  });

  return reactive(query);
}
