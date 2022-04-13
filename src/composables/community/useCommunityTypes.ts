import { reactive } from "vue";
import { useQuery } from "vue-query";
import { useApi } from "../common/useApi";

export function useCommunityTypes() {
  const api = useApi();

  const query = useQuery({
    queryKey: "COMMUNITY_TYPES",
    queryFn: () => api.community.communityTypes().then((result) => result.data),
  });

  return reactive(query);
}
