import { reactive } from "vue";
import { useQuery } from "vue-query";

import { useAuth } from "../auth/useAuth";
import { useApi } from "../common/useApi";

export function useMe() {
  const api = useApi();
  const auth = useAuth();

  return reactive(
    useQuery({
      queryKey: ["me", auth.isLogged],
      queryFn: () => api.user.me().then((result) => result.data),
      retry: 0,
      keepPreviousData: true,
      enabled: auth.isLogged,
    })
  );
}
