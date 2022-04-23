import { fromEvent, map, merge, share, startWith, switchMap } from "rxjs";
import { ref, Ref, watch } from "vue";

import {
  getClientSize,
  getResize$,
  getScrollPosition,
  getScrollSize,
  isScrollReached,
} from "@/lib/dom-helpers";

export default function useScrollReached(element: Ref<HTMLElement | null>) {
  const reached = ref({
    left: true,
    right: true,
    top: true,
    bottom: true,
  });

  watch(
    () => element.value,
    (elem) => {
      if (elem != null) {
        const scroll$ = fromEvent<MouseEvent>(elem, "scroll").pipe(share());
        const resize$ = getResize$(elem);

        /*
        스크롤 포지션은
        1) 스크롤에 시
        2) 간혹 리사이징 시
        바뀐다.
        */
        const scrollPositionOnScroll$ = scroll$.pipe(
          map((event) => getScrollPosition(event.target as HTMLElement))
        );

        const scrollPositionOnResize$ = resize$.pipe(
          map((entries) => getScrollPosition(entries[0].target as HTMLElement))
        );

        // 스크롤시 변경되는 포지션, 리사이즈시 변경되는 포지션 이벤트를 하나로 합친다.
        const scrollPosition$ = merge(scrollPositionOnResize$, scrollPositionOnScroll$).pipe(
          startWith(getScrollPosition(elem))
        );

        /*
        스크롤 사이즈는
        1) 리사이징 발생 시
        바뀐다.
        */
        const scrollSize$ = resize$.pipe(
          map((entries) => getScrollSize(entries[0].target as HTMLElement)),
          startWith(getScrollSize(elem))
        );

        /*
        클라이언트 사이즈는
        1) 리사이징시 바뀐다.
        */
        const clientSize$ = resize$.pipe(
          map((entries) => getClientSize(entries[0].target as HTMLElement)),
          startWith(getClientSize(elem))
        );

        /*
        스크롤이 끝에 닿았는가?
        1. scrollSize가 바뀌면
        2. clientSize가 바뀌면
        3. scrollPosition이 바뀌면
        */
        const reached$ = scrollSize$.pipe(
          switchMap((scrollSize) =>
            clientSize$.pipe(
              switchMap((clientSize) =>
                scrollPosition$.pipe(
                  map((scrollPosition) => isScrollReached(scrollSize, clientSize, scrollPosition))
                )
              )
            )
          )
        );

        const reachedSubscription = reached$.subscribe((value) => {
          reached.value = value;
        });

        return () => {
          reachedSubscription.unsubscribe();
        };
      }

      // element 없다면 기본값
      reached.value = {
        left: true,
        right: true,
        top: true,
        bottom: true,
      };

      return null;
    }
  );

  return reached;
}
