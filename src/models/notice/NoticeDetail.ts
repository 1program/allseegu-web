import { Files } from "../file";
import { Notice } from "./Notice";

export interface NoticeDetail extends Notice {
  files: Files;
}
