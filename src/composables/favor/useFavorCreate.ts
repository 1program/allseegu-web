import { reactive } from "vue";
import { useMutation, useQueryClient } from "vue-query";

import { FavorCreateOptions } from "@/api/FavorApi";
import { FavorInput } from "@/models/favor";

import { useAlert } from "../common/useAlert";
import { useApi } from "../common/useApi";
import { useMe } from "../user/useMe";

export function useFavorCreate() {
  const queryClient = useQueryClient();

  const api = useApi();

  const alert = useAlert();

  const me = useMe();

  const mutation = useMutation({
    mutationKey: "FAVOR_CREATE",
    mutationFn: async (options: FavorCreateOptions) => {
      return api.favor.createFavor(options);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["FAVOR_LIST", me.data?.id]);
    },
    onError: (error: any) => alert(error.message),
  });

  return reactive(mutation);
}
