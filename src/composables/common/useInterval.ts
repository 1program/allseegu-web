import { onMounted, ref } from "vue";

export function useInterval(interval: number) {
  const count = ref(0);

  onMounted(() => {
    const timer = setInterval(() => {
      count.value += 1;
    }, interval);

    return () => {
      clearInterval(timer);
    };
  });

  return count;
}
