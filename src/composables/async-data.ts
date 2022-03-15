import { reactive, ref, Ref, watch } from "vue";

export interface AsyncDataOptions<Params, Result> {
  params: Ref<Params>;
  loader: (params: Params) => Promise<Result>;
  using: Ref<boolean>;
}

export function useAsyncData<Params, Result>({
  loader,
  params,
  using,
}: AsyncDataOptions<Params, Result>) {
  const data = ref(null) as Ref<Result | null>;
  const loading = ref<boolean>(false);
  const error = ref<unknown | null>(null);

  watch(
    () => [loader, params.value, using.value],
    async () => {
      if (using.value) {
        loading.value = true;

        try {
          const result = await loader(params.value);
          data.value = result;
        } catch (ex) {
          error.value = ex;
        } finally {
          loading.value = false;
        }
      }
    },
    { immediate: true }
  );

  return reactive({
    data,
    loading,
    error,
  });
}
