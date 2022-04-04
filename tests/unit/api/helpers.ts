/*
API 테스트를 위한 헬퍼들이다.
*/

import AuthApi from "@/api/AuthApi";
import { API_URL, TEST_ACCOUNT } from "@/lib/config";

/**
 * 테스트 계정으로 로그인한다.
 */
export function loginTestAccount() {
  const authApi = new AuthApi({
    baseURL: API_URL,
  });

  return authApi.login({
    data: TEST_ACCOUNT,
  });
}
