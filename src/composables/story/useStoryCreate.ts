import { reactive } from "vue";
import { useMutation, useQueryClient } from "vue-query";

import { useAlert } from "../common/useAlert";
import { useApi } from "../common/useApi";

export function useStoryCreate() {
  const queryClient = useQueryClient();
  const alert = useAlert();
  const api = useApi();

  const mutation = useMutation({
    mutationKey: "STORY_CREATE",
    mutationFn: api.story.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["MY_STORY_LIST"]);
      alert(data.message);
    },
    // TODO: 개선
    // eslint-disable-next-line
    onError: (error: any) => alert(error.message),
  });

  return reactive(mutation);
}
