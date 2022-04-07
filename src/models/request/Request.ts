import { Auditable } from "../common";

export interface Request extends Auditable {
  id: number;
  uuid: string;
  user_id: number;
  title: string;
  type: string;
  link: string | null;
  password: string | null;
  redev_name: string;
  content: string;
  status: "반려";
  rejection_message: string;
  is_visible: 1 | 0;
  hits: number;
}
