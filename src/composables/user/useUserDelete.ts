import { reactive } from "vue";
import { useMutation, useQueryClient } from "vue-query";

import { UserDeleteOptions } from "@/api/UserApi";

import { useAlert } from "../common/useAlert";
import { useApi } from "../common/useApi";

export function useUserDelete() {
  const queryClient = useQueryClient();

  const api = useApi();

  const alert = useAlert();

  const mutation = useMutation({
    mutationKey: "USER_DELETE",
    mutationFn: (options: UserDeleteOptions) => api.user.delete(options),
    onSuccess: () => {
      queryClient.invalidateQueries(["ME"]);
    },
    onError: (error: any) => alert(error.message),
  });

  return reactive(mutation);
}
