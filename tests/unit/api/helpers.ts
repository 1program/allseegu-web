/*
API 테스트를 위한 헬퍼들이다.
*/

import AuthApi from "@/api/AuthApi";
import { DEV_API_URL } from "@/lib/config";

/**
 * 테스트 계정 정보
 */
export const TEST_ACCOUNT = {
  email: "admin@demo.com",
  password: "abcd1234",
};

/**
 * 테스트 계정으로 로그인한다.
 */
export function loginTestAccount() {
  const authApi = new AuthApi({
    baseURL: DEV_API_URL,
  });

  return authApi.login({
    data: TEST_ACCOUNT,
  });
}
