import { Files } from "../file";
import { Subscribe } from "./Subscribe";

export interface SubscribeDetail extends Subscribe {
  files: Files;
}
