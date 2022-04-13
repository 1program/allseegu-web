import { VideoListOptions } from "@/api/VideoApi";
import { PagedList } from "@/models/common/PagedList";
import { Video } from "@/models/video";
import { computed, reactive, Ref } from "vue";
import { useInfiniteQuery } from "vue-query";
import { useApi } from "../common/useApi";

export function useVideoList(options: Ref<VideoListOptions>) {
  const api = useApi();

  const query = useInfiniteQuery<PagedList<Video>>({
    queryKey: computed(() => ["VIDEO_LIST", options.value.redev_id]),

    queryFn: (context) =>
      api.video
        .videoList({
          take: 20,
          ...options.value,
          page: context.pageParam,
        })
        .then((result) => result.data),

    // 다음 페이지 번호 얻어오기 (null이면 다음 페이지 없음)
    getNextPageParam: (lastPage) => lastPage.next_page,

    // 이전 페이지 번호 얻어오기 (null이면 이전 페이지 없음)
    getPreviousPageParam: (firstPage) => firstPage.prev_page,
  });

  return reactive(query);
}
