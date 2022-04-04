import { watch } from "vue";

/**
 * Vue의 reactive data를 watch하고 console.log 남긴다.
 */
export const watchLog = (source: () => any) =>
  watch(source, (value) => console.log(value), { immediate: true });
