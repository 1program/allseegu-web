import { reactive } from "vue";
import { useQuery } from "vue-query";
import { useApi } from "../common/useApi";

export function useRedevHotIssueList() {
  const api = useApi();

  return reactive(
    useQuery(["redevHotIssues"], () => api.redev.hotIssueList().then((result) => result.data), {
      retry: 0,
      retryDelay: 10,
      retryOnMount: true,
      keepPreviousData: true,
      initialData: [],
    })
  );
}
