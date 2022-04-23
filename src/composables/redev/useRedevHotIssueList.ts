import { reactive } from "vue";
import { useQuery } from "vue-query";

import { useApi } from "../common/useApi";

export function useRedevHotIssueList() {
  const api = useApi();

  return reactive(
    useQuery({
      queryKey: ["REDEV_HOT_ISSUES"],
      queryFn: () => api.redev.hotIssueList().then((result) => result.data.slice(0, 10)),
      placeholderData: [],
    })
  );
}
