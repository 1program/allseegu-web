import { Auditable } from "../common";
import { RequestStatus } from "./RequestStatus";
import { RequestType } from "./RequestType";

export interface Request extends Auditable {
  id: number;
  uuid: string;
  user_id: number;
  title: string;
  type: RequestType;
  link: string | null;
  password: string | null;
  redev_name: string;
  content: string;
  status: RequestStatus;
  rejection_message: string;
  is_visible: 1 | 0;
  hits: number;
}
