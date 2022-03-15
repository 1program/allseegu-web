/*
인증 관련 기능 제공
*/

import { computed, ComputedRef, inject, provide, ref, Ref } from "vue";

export const AUTH_CONTEXT_SYMBOL = Symbol("AUTH_CONTEXT_SYMBOL");

/**
 * 인증 상태
 */
export interface AuthState {
  accessToken: string | null;
  persist: boolean;
}

export interface AuthContext {
  accessToken: Ref<string | null>;
  isLogged: ComputedRef<boolean>;
  login: (accessToken: string, persist: boolean) => void;
  logout: () => void;
}

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
