import { reactive } from "vue";
import { useMutation, useQueryClient } from "vue-query";

import { useAlert } from "../common/useAlert";
import { useApi } from "../common/useApi";

export function useRequestDelete() {
  const queryClient = useQueryClient();
  const alert = useAlert();
  const api = useApi();

  const mutation = useMutation({
    mutationKey: "REQUEST_DELETE",
    mutationFn: api.qna.delete,
    onSuccess: (data, options) => {
      queryClient.invalidateQueries(["REQUEST_LIST"]);
      queryClient.invalidateQueries(["REQUEST_DETAIL", options.qna_id]);
      alert(data.message);
    },
    // TODO: 개선
    onError: (error: any) => alert(error.message),
  });

  return reactive(mutation);
}
