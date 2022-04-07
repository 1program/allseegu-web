import { Auditable, ContentType, Entity } from "../common";

export interface Story extends Entity, Auditable {
  redev_id: number;
  title: string;
  content_type: ContentType;
  content: string;
  link: string | null;
  is_visible: 1 | 0;
  hits: number;
  comments_count: number;
  model: "story";
  redev_title: string | null;
}
