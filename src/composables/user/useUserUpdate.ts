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
    mutationFn: api.user.update,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["ME"]);
      alert(data.message);
    },
    // eslint-disable-next-line
    onError: (error: any) => alert(error.message),
  });

  return reactive(mutation);
}
