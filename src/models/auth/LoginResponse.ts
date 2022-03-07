import { User } from "../user";

export interface LoginResponse {
  token_type: string;
  api_token: string;
  user: User;
}
