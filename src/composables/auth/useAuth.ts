/*
인증 관련 기능 제공
*/
import { computed, ComputedRef, inject, provide, ref, Ref } from "vue";

/**
 * Auth Context의 식별자이다.
 */
export const AUTH_CONTEXT_SYMBOL = Symbol("AUTH_CONTEXT_SYMBOL");

/**
 * 인증 상태
 */
export interface AuthState {
  accessToken: string | null;
  persist: boolean;
}

/**
 * 어플리케이션에 공유될 인증 상태 컨텍스트이다.
 */
export interface AuthContext {
  accessToken: Ref<string | null>;
  isLogged: ComputedRef<boolean>;
  login: (accessToken: string, persist: boolean) => void;
  logout: () => void;
}

/**
 * 어플리케이션에 인증 상태를 설치한다.
 */
export function provideAuth() {
  const accessToken = ref<string | null>(
    window.localStorage.getItem("_API_TOKEN") ?? window.sessionStorage.getItem("_API_TOKEN") ?? null
  );

  const login = (newAccessToken: string, persist: boolean) => {
    accessToken.value = newAccessToken;

    window.localStorage.removeItem("_API_TOKEN");
    window.sessionStorage.removeItem("_API_TOKEN");

    const storage = persist ? window.localStorage : window.sessionStorage;

    storage.setItem("_API_TOKEN", newAccessToken);
  };

  const logout = () => {
    accessToken.value = null;

    window.localStorage.removeItem("_API_TOKEN");
    window.sessionStorage.removeItem("_API_TOKEN");
  };

  // 로그인 되었는가?
  const isLogged = computed(() => accessToken.value != null);

  const context = {
    accessToken,
    login,
    logout,
    isLogged,
  };

  provide(AUTH_CONTEXT_SYMBOL, context);

  return context;
}

export function useAuth() {
  const context = inject<AuthContext>(AUTH_CONTEXT_SYMBOL);

  if (context == null) {
    throw new Error("auth context is not initialized.");
  }

  return context;
}
