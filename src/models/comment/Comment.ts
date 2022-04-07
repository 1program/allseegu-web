import { Auditable, ContentType } from "../common";

export interface Comment extends Auditable {
  comment_id: number | null;

  content_type: ContentType;

  content: string;

  uuid: string;

  parent_uuid: string;

  commentable_id: number;

  commentable_type: string;

  id: number;
}

export const mockComment = {
  comment_id: null,
  content_type: "plain",
  content: "내용입니다.",
  uuid: "da414a1d-9085-49e3-be9b-596f696eb5e1",
  user_id: 11,
  parent_uuid: "fbd23180-c017-34a6-822d-026fdeda032e",
  commentable_id: 9,
  commentable_type: "App\\Models\\Story",
  updated_at: "2022-03-22T17:55:13.000000Z",
  created_at: "2022-03-22T17:55:13.000000Z",
  id: 14,
};
