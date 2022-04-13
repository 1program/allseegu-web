import AuthApi from "@/api/AuthApi";
import CommentApi from "@/api/CommentApi";
import { CommunityApi } from "@/api/CommunityApi";
import FileApi from "@/api/FileApi";
import { NewsApi } from "@/api/NewsApi";
import NoticeApi from "@/api/NoticeApi";
import RedevApi from "@/api/RedevApi";
import StoryApi from "@/api/StoryApi";
import SubscribeApi from "@/api/SubscribeApi";
import UserApi from "@/api/UserApi";
import VideoApi from "@/api/VideoApi";
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
  subscribe: SubscribeApi;
  notice: NoticeApi;
  video: VideoApi;
  community: CommunityApi;
  news: NewsApi;
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

  const subscribe = computed(() => new SubscribeApi(options.value));

  const notice = computed(() => new NoticeApi(options.value));

  const video = computed(() => new VideoApi(options.value));

  const community = computed(() => new CommunityApi(options.value));

  const news = computed(() => new NewsApi(options.value));

  const context = reactive({
    auth,
    redev,
    user,
    file,
    story,
    comment,
    subscribe,
    notice,
    video,
    community,
    news,
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
