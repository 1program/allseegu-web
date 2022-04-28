import { reactive } from "vue";
import { useMutation, useQueryClient } from "vue-query";

import { useAlert } from "../common/useAlert";
import { useApi } from "../common/useApi";

export function useQnaDelete() {
  const queryClient = useQueryClient();
  const alert = useAlert();
  const api = useApi();

  const mutation = useMutation({
    mutationKey: "QNA_DELETE",
    mutationFn: api.qna.delete,
    onSuccess: (data, options) => {
      queryClient.invalidateQueries(["QNA_LIST"]);
      queryClient.invalidateQueries(["QNA_DETAIL", options.qna_id]);
      alert(data.message);
    },
    // TODO: 개선
    onError: (error: any) => alert(error.message),
  });

  return reactive(mutation);
}
