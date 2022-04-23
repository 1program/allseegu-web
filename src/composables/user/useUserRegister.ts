import { reactive } from "vue";
import { useMutation, useQueryClient } from "vue-query";

import { UserRegisterInput } from "@/models/user";

import { useAuth } from "../auth/useAuth";
import { useAlert } from "../common/useAlert";
import { useApi } from "../common/useApi";

export function useUserRegister() {
  const auth = useAuth();

  const api = useApi();

  const alert = useAlert();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: "USER_REGISTER",
    mutationFn: (options: UserRegisterInput) => api.user.register(options),
    onSuccess: (data) => {
      // 엑세스 토큰을 저장한다.
      auth.login(data.data.api_token, true);

      // 내 정보를 invalidate 한다.
      queryClient.invalidateQueries(["ME"]);
    },
    onError: (error: any) => alert(error.message),
  });

  return reactive(mutation);
}
