import AuthApi from "@/api/AuthApi";
import RedevApi from "@/api/RedevApi";
import UserApi from "@/api/UserApi";
import { API_URL } from "@/lib/config";
import { computed, inject, provide, reactive, Ref } from "vue";

export const API_CONTEXT_SYMBOL = Symbol("API_CONTEXT_SYMBOL");

/**
 * 인증정보를 사용해서
 * API 인스턴스를 생성하여 전체 트리에 공유한다.
 */
export interface ApiContext {
  auth: AuthApi;
  redev: RedevApi;
  user: UserApi;
}

export interface ApiProviderParams {
  accessToken: Ref<string | null>;
}

export function provideApi({ accessToken }: ApiProviderParams) {
  const options = computed(() => ({
    baseURL: API_URL,
    accessToken: accessToken.value,
  }));

  const context = reactive({
    auth: computed(() => new AuthApi(options.value)),
    redev: computed(() => new RedevApi(options.value)),
    user: computed(() => new UserApi(options.value)),
  });

  provide(API_CONTEXT_SYMBOL, context);
}

export function useApi() {
  const context = inject<ApiContext>(API_CONTEXT_SYMBOL);

  if (context == null) {
    throw new Error("Cannot use ApiContext before provide");
  }

  return context;
}
