import { debounceTime, fromEvent, map } from "rxjs";
import { ref } from "vue";

export const useResizing = () => {
  const resizing = ref(false);
};
