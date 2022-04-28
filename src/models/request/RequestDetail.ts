import { ContentType } from "../common";
import { Files } from "../file";
import { Request } from "./Request";

export interface RequestDetail extends Request {
  content_type: ContentType;
  files: Files;
  comments: Comment[];
}
