import { User } from "../user";

/**
 * 로그인 응답
 */
export interface LoginResponse {
  token_type: string;
  api_token: string;
  user: User;
}
