import { ContentType } from "../common";

export interface QnaInput {
  qna_type_id: number;
  title: string;
  content_type: ContentType;
  content: string;
  is_visible: 1 | 0;
}
