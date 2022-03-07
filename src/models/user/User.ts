export interface User {
  id: number;
  uuid: string;
  group_id: number | null;
  user_id: number | null;
  email: string;
  name: string;
  nickname: string;
  mobile: string;
  date_of_birth: number; // 19920101;
  gender: "male" | "female" | "private"; // "private";
  status: "active" | "inactive";
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}
