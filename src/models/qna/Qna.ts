import { Auditable, ContentType, Entity } from "../common";
import { QnaStatus } from "./QnaStatus";

export interface Qna extends Entity, Auditable {
  qna_type_id: number;
  title: string;
  content_type: ContentType;
  content: string;
  link: string | null;
  is_visible: 1 | 0;
  hits: number;
  status: QnaStatus;
}
