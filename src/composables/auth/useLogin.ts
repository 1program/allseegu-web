import { reactive } from "vue";
import { useMutation } from "vue-query";

import { LoginRequest } from "@/models/auth";

import { useApi } from "../common/useApi";
import { useAuth } from "./useAuth";

export interface UseLoginOptions {
  data: LoginRequest;
  autoLogin: boolean;
}

export function useLogin() {
  const api = useApi();

  const auth = useAuth();

  const mutation = useMutation({
    mutationKey: "LOGIN",
    mutationFn: (options: UseLoginOptions) =>
      api.auth.login({
        data: options.data,
      }),
    onSuccess: (result, options) => {
      auth.login(result.data.api_token, options.autoLogin);
    },
  });

  return reactive(mutation);
}
