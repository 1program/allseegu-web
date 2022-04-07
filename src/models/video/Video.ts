import { Auditable, ContentType, Entity } from "../common";

export interface Video extends Entity, Auditable {
  redev_id: number;
  title: string;
  content_type: ContentType;
  content: string;
  link: string | null;
  is_visible: 1 | 0;
  hits: number;
  files: {
    images: []; // TODO: Check
    docs: []; // TODO: Check
  };
}
