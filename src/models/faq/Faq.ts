import { Auditable, ContentType, Entity } from "../common";

export interface Faq extends Entity, Auditable {
  faq_type_id: number;
  title: string;
  content_type: ContentType;
  content: string;
  link: string | null;
  is_visible: 1 | 0;
  hits: number;
  nickname: string;
}
