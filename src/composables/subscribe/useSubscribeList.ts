import { computed, reactive, Ref } from "vue";
import { useInfiniteQuery } from "vue-query";

import { SubscribeListOptions } from "@/api/SubscribeApi";
import { PagedList } from "@/models/common";
import { Subscribe } from "@/models/subscribe";

import { useApi } from "../common/useApi";

/**
 * 전문가 의견 반응형 목록 데이터 사용
 */
export function useSubscribeList(options: Ref<SubscribeListOptions>) {
  const api = useApi();

  // vue-query로 http 캐싱을 구현한다.
  const query = useInfiniteQuery<PagedList<Subscribe>>({
    // 캐시 키
    // 데이터 변경 (추가/수정/삭제)시 해당 쿼리 키 기준으로 캐시를 찾아 무효화 할 수 있다.
    queryKey: computed(() => ["SUBSCRIBE_LIST", options.value.redev_id]),

    // 요청 함수 (queryKey가 바뀔 때 마다 재실행된다.)
    queryFn: (context) =>
      api.subscribe
        .subscribeList({
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
