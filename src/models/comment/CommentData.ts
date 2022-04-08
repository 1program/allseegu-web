import { ContentType } from "../common";

export interface CommentData {
  content_type: ContentType;
  content: string;
  uploadFiles: File[];
  deleteFiles: number[];
}
