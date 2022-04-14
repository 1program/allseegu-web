import { UserUpdateOptions } from "@/api/UserApi";
import { reactive } from "vue";
import { useMutation, useQueryClient } from "vue-query";
import { useAlert } from "../common/useAlert";
import { useApi } from "../common/useApi";

export function useUserUpdate() {
  const queryClient = useQueryClient();

  const alert = useAlert();

  const api = useApi();

  const mutation = useMutation({
    mutationKey: "USER_UPDATE",
    mutationFn: (options: UserUpdateOptions) => api.user.update(options),
    onSuccess: () => {
      queryClient.invalidateQueries(["ME"]);
    },
    onError: (error: any) => alert(error.message),
  });

  return reactive(mutation);
}
