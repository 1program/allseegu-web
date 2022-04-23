import { inject, provide, reactive } from "vue";

import { generateMobileNumber } from "@/utils/common/generateMobileNumber";

export type UserRegisterValues = {
  over14: boolean;
  service: boolean;
  marketing: boolean;

  name: string;
  mobile: string;
  birth: string;
  gender: string;

  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  nickname: string;
};

export type UserRegisterValuesContext = {
  values: UserRegisterValues;
};

/**
 * 하위 트리에 회원가입 values 저장소를 공급한다.
 */
export function provideUserRegisterValues() {
  const context = reactive<UserRegisterValuesContext>({
    values: {
      over14: false,
      service: false,
      marketing: false,
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: "",
      nickname: "",

      // TODO: 본인인증에서 값 받아오기
      name: "홍길동",
      mobile: generateMobileNumber(),
      birth: "19900101",
      gender: "male",
    },
  });

  provide("USER_REGISTER_VALUES", context);

  return context;
}

export function useUserRegisterValues() {
  const context = inject<UserRegisterValuesContext>("USER_REGISTER_VALUES");

  if (context == null) {
    throw new Error("비정상적인 접근입니다.");
  }

  return context;
}
