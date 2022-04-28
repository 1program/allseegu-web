import { reactive } from "vue";
import { useMutation, useQueryClient } from "vue-query";

import { useAlert } from "../common/useAlert";
import { useApi } from "../common/useApi";

export function useRequestCreate() {
  const queryClient = useQueryClient();
  const alert = useAlert();
  const api = useApi();

  const mutation = useMutation({
    mutationKey: "REQUEST_CREATE",
    mutationFn: api.request.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["REQUEST_LIST"]);
      alert(data.message);
    },
    // TODO: 개선
    // eslint-disable-next-line
    onError: (error: any) => alert(error.message),
  });

  return reactive(mutation);
}
