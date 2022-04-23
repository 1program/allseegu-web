import { reactive } from "vue";
import { useQuery } from "vue-query";

import { useApi } from "../common/useApi";

export function useNewsTypes() {
  const api = useApi();

  const query = useQuery({
    queryKey: "NEWS_TYPES",
    queryFn: () => api.news.newsTypes().then((result) => result.data),
  });

  return reactive(query);
}
