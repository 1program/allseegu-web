import { Auditable, ContentType, Entity } from "../common";

export interface Notice extends Entity, Auditable {
  redev_id: number;
  title: string;
  content_type: ContentType;
  content: string;
  link: string | null;
  is_notice: 1 | 0;
  is_visible: 1 | 0;
  hits: number;
}
