import { Auditable, Entity } from "../common";

export interface Estate extends Entity, Auditable {
  redev_id: number;
  title: string;
  owner: string;
  tel: string;
  address: string;
  is_visible: 1 | 0;
  hits: number;
}
