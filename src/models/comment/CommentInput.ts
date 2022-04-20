import { ContentType } from "../common";

export interface CommentInput {
  content_type: ContentType;
  content: string;
  uploadFiles: File[];
  deleteFiles: number[];
}
