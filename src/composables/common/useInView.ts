import { Ref, ref, watchEffect } from "vue";

export interface UseInViewOptions {
  /**
   * 감시할 엘리먼트의 ref
   */
  trigger: Ref<HTMLElement | undefined>;

  /**
   * 요소가 뷰 안에 들어왔을 때
   */
  onInView?: () => void;

  /**
   * 요소가 뷰 밖으로 나갔을 때
   */
  onOutView?: () => void;
}

export function useInView({ trigger, onInView, onOutView }: UseInViewOptions) {
  const inView = ref(false);

  const handleIntersect = (entry: IntersectionObserverEntry) => {
    if (entry.isIntersecting) {
      inView.value = true;
      onInView?.();
    } else {
      inView.value = false;
      onOutView?.();
    }
  };

  watchEffect((cleanup) => {
    if (trigger.value) {
      const observer = new IntersectionObserver((entries) => {
        handleIntersect(entries[0]);
      });

      observer.observe(trigger.value);

      cleanup(() => {
        observer.disconnect();
      });
    }
  });

  return {
    trigger,
    inView,
  };
}
