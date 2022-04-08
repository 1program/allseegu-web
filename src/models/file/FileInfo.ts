import { Auditable, Entity } from "../common";

export interface FileInfo extends Entity, Auditable {
  parent_uuid: string;
  order: number;
  name: string;
  mime: string;
  size: number;
  download: number;
  url: string;
}
