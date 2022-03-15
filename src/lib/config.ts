/*
환경에 따라 바뀌어야 하는 값들은 .env로 설정하고 하단 설정을 바꾸어 준다.
환경에 따라 바뀔 필요가 없는 값들은 고정값으로 선언한다.
*/

export const API_URL = process.env.VUE_APP_API_URL;

export const KAKAO_REST_API_KEY = process.env.VUE_APP_KAKAO_REST_API_KEY;

export const KAKAO_JAVASCRIPT_KEY = process.env.VUE_APP_KAKAO_JAVASCRIPT_KEY;

export const TEST_ACCOUNT = {
  email: "admin@demo.com",
  password: "abcd1234",
};
