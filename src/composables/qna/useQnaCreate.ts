import { reactive } from "vue";
import { useMutation, useQueryClient } from "vue-query";

import { QnaCreateOptions } from "@/api/QnaApi";

import { useAlert } from "../common/useAlert";
import { useApi } from "../common/useApi";

export function useQnaCreate() {
  const queryClient = useQueryClient();
  const alert = useAlert();
  const api = useApi();

  const mutation = useMutation({
    mutationKey: "QNA_CREATE",
    mutationFn: async (options: QnaCreateOptions) => {
      return api.qna.create(options);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["MY_QNA_LIST"]);
      alert(data.message);
    },
    // TODO: 개선
    onError: (error: any) => alert(error.message),
  });

  return reactive(mutation);
}
