import AuthApi from "@/api/AuthApi";
import CommentApi from "@/api/CommentApi";
import FileApi from "@/api/FileApi";
import RedevApi from "@/api/RedevApi";
import StoryApi from "@/api/StoryApi";
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
  file: FileApi;
  story: StoryApi;
  comment: CommentApi;
}

export interface ApiProviderOptions {
  accessToken: Ref<string | null>;
}

export function provideApi({ accessToken }: ApiProviderOptions) {
  const options = computed(() => ({
    baseURL: API_URL,
    accessToken: accessToken.value,
  }));

  const auth = computed(() => new AuthApi(options.value));

  const redev = computed(() => new RedevApi(options.value));

  const user = computed(() => new UserApi(options.value));

  const file = computed(() => new FileApi(options.value));

  const story = computed(() => new StoryApi(options.value, file.value));

  const comment = computed(() => new CommentApi(options.value, file.value));

  const context = reactive({
    auth,
    redev,
    user,
    file,
    story,
    comment,
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
