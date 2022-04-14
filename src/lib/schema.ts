import * as yup from "yup";
import { PASSWORD_REGEXP } from "./regexp";

/**
 * 이메일 검증규칙
 */
export const emailSchema = yup
  .string()
  .default("")
  .required("이메일을 입력해 주세요.")
  .email("올바르지 않은 이메일 주소입니다.");

/**
 * 이메일 확인 검증규칙
 */
export const confirmEmailSchema = (compareField: string) =>
  yup
    .string()
    .default("")
    .required("이메일을 확인해 주세요.")
    .oneOf([yup.ref(compareField), null], "이메일 주소가 일치하지 않습니다.");

/**
 * 닉네임 검증규칙
 */
export const nicknameSchema = yup.string().default("").required("닉네임을 입력해 주세요.");

/**
 * 비밀번호 검증규칙
 */
export const passwordSchema = yup
  .string()
  .default("")
  .required("비밀번호를 입력해 주세요.")
  .min(8, "비밀번호는 8자 이상입니다.")
  .matches(PASSWORD_REGEXP, "영문 대소문자, 숫자 및 특수기호(!,@,#,$,%,^,+,-,=)만 허용됩니다.");

/**
 * 비밀번호 확인 검증규칙
 * @param compareField 비교할 대상 필드명
 */
export const confirmPasswordSchema = (compareField: string) =>
  yup
    .string()
    .default("")
    .required("비밀번호를 확인해 주세요.")
    // '비밀번호 확인'이 입력 되었을 시에만 validate 한다.
    .oneOf([yup.ref(compareField), null], "비밀번호가 일치하지 않습니다.");
