import * as yup from "yup";
import {
  EMAIL_INVALID,
  EMAIL_REQUIRED,
  NICKNAME_REQUIRED,
  PASSWORD_CONFIRM_REQUIRED,
  PASSWORD_INVALID,
  PASSWORD_NOT_MATCHED,
  PASSWORD_REQUIRED,
  PASSWORD_TOO_SHORT,
} from "./messages";
import { PASSWORD_REGEXP } from "./regexp";

/**
 * 이메일 검증규칙
 */
export const emailSchema = yup.string().required(EMAIL_REQUIRED).email(EMAIL_INVALID);

/**
 * 이메일 확인 검증규칙
 */
export const confirmEmailSchema = (compareField: string) =>
  yup
    .string()
    .required("이메일을 확인해 주세요.")
    .oneOf([yup.ref(compareField), null], "이메일 주소가 일치하지 않습니다.");

/**
 * 닉네임 검증규칙
 */
export const nicknameSchema = yup.string().required(NICKNAME_REQUIRED);

/**
 * 비밀번호 검증규칙
 */
export const passwordSchema = yup
  .string()
  .required(PASSWORD_REQUIRED)
  .min(8, PASSWORD_TOO_SHORT)
  .matches(PASSWORD_REGEXP, PASSWORD_INVALID);

/**
 * 비밀번호 확인 검증규칙
 * @param compareField 비교할 대상 필드명
 */
export const confirmPasswordSchema = (compareField: string) =>
  yup
    .string()
    .required(PASSWORD_CONFIRM_REQUIRED)
    // '비밀번호 확인'이 입력 되었을 시에만 validate 한다.
    .oneOf([yup.ref(compareField), null], PASSWORD_NOT_MATCHED);
