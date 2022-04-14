import { ContentType } from "../common";

export interface StoryInput {
  title: string;
  content_type?: ContentType;
  content: string;
  is_visible?: 1 | 0;
  uploadFiles: File[];
  deleteFiles: number[];
}
