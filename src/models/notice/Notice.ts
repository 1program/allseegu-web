import { Auditable, ContentType, Entity } from "../common";

export interface Notice extends Entity, Auditable {
  redev_id: number;
  title: string;
  content_type: ContentType; // TODO: enum check
  content: string;
  link: null; // TODO: CHECK
  is_notice: 0 | 1;
  is_visible: 0 | 1;
  hits: number;
}
