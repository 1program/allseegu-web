import { reactive } from "vue";
import { useMutation, useQueryClient } from "vue-query";

import { FavorDeleteOptions } from "@/api/FavorApi";

import { useAlert } from "../common/useAlert";
import { useApi } from "../common/useApi";
import { useMe } from "../user/useMe";

export function useFavorDelete() {
  const queryClient = useQueryClient();

  const api = useApi();

  const alert = useAlert();

  const me = useMe();

  const mutation = useMutation({
    mutationKey: "FAVOR_DELETE",
    mutationFn: async (options: FavorDeleteOptions) => {
      return api.favor.deleteFavor(options);
    },
    onSuccess: () => {
      // TODO: optimistic update로 변경
      queryClient.invalidateQueries(["FAVOR_LIST", me.data?.id]);
    },
    onError: (error: any) => alert(error.message),
  });

  return reactive(mutation);
}
