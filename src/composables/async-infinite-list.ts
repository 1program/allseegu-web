import { ApiResponse, PagedList } from "@/models/common";
import { computed, reactive, ref, Ref, watch } from "vue";

export interface AsyncInfiniteListParams {
  page: number;
  take: number;
}

export interface AsyncInfiniteListOptions<Params extends AsyncInfiniteListParams, Result> {
  params: Ref<Params>;
  loader: (params: Params) => Promise<ApiResponse<PagedList<Result>>>;
  using: Ref<boolean>;
}

export function useAsyncInfiniteList<Params extends AsyncInfiniteListParams, Result>({
  loader,
  params,
  using,
}: AsyncInfiniteListOptions<Params, Result>) {
  const lastResult = ref(null) as Ref<PagedList<Result> | null>;

  const list = ref([]) as Ref<Result[]>;
  const loading = ref<boolean>(false);
  const error = ref<unknown | null>(null);

  const hasNext = computed(
    () => lastResult.value != null && lastResult.value.current_page < lastResult.value?.last_page
  );

  const loadingNext = ref(false);
  const errorNext = ref<unknown | null>(null);

  const load = async () => {
    if (using.value) {
      loading.value = true;

      try {
        const result = await loader(params.value);
        list.value = result.data.data;
        lastResult.value = result.data;
      } catch (ex) {
        error.value = ex;
      } finally {
        loading.value = false;
      }
    }
  };

  const loadNext = async () => {
    if (using) {
      loadingNext.value = true;

      try {
        const result = await loader({
          ...params.value,
          page: (lastResult.value?.current_page ?? 0) + 1,
        });
        list.value = [...list.value, ...result.data.data];
        lastResult.value = result.data;
      } catch (ex) {
        errorNext.value = ex;
      } finally {
        loadingNext.value = false;
      }
    }
  };

  watch(() => [loader, params.value, using.value, using.value], load, { immediate: true });

  return reactive({
    list,
    loading,
    error,
    load,

    hasNext,
    loadingNext,
    errorNext,
    loadNext,
  });
}
