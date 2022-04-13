import { Auditable, Entity } from "../common";

export interface CommunityTypeInfo extends Entity, Auditable {
  title: string;
  order: number;
  is_visible: 1 | 0;
}
