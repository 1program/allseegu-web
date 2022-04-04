import { inject, provide, reactive } from "vue";

export type SignupValues = {
  over14?: boolean;
  service?: boolean;
  marketing?: boolean;

  email?: string;
  confirmEmail?: string;
  password?: string;
  confirmPassword?: string;
  nickname?: string;
};

export type SignupContext = {
  values: SignupValues;
};

/**
 * 하위 트리에 회원가입 values 저장소를 공급한다.
 */
export function provideSignup() {
  const context = reactive<SignupContext>({
    values: {},
  });

  provide("SIGNUP_CONTEXT", context);

  return context;
}

export function useSignup() {
  const context = inject<SignupContext>("SIGNUP_CONTEXT");

  if (context == null) {
    throw new Error("비정상적인 접근입니다.");
  }

  return context;
}
