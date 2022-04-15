import adImage1 from "@/images/mocks/ad1.jpg";
import adImage2 from "@/images/mocks/ad2.jpg";

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

export const fileInfoExample1: FileInfo = {
  id: 1,
  uuid: "test",
  user_id: null,
  created_at: "2022-01-01",
  updated_at: "2022-01-01",
  parent_uuid: "test",
  order: 0,
  name: "파일",
  mime: "string",
  size: 1000,
  download: 0,
  url: adImage1,
};

export const fileInfoExample2: FileInfo = {
  id: 2,
  uuid: "test2",
  user_id: null,
  created_at: "2022-01-01",
  updated_at: "2022-01-01",
  parent_uuid: "test",
  order: 0,
  name: "파일",
  mime: "string",
  size: 1000,
  download: 0,
  url: adImage2,
};
