import { Auditable, ContentType, Entity } from "../common";
import { Files } from "../file";

export interface Comment extends Entity, Auditable {
  /**
   * 부모 댓글 id
   */
  comment_id: number | null;

  /**
   * 내용 format
   */
  content_type: ContentType;

  /**
   * 내용
   */
  content: string;

  /**
   * 닉네임
   */
  nickname: string;

  /**
   * 게시글 uuid
   */
  parent_uuid: string;

  /**
   * 게시글 id
   */
  commentable_id: number;

  /**
   * 게시글 type
   * ex. App\\Models\\Story
   */
  commentable_type: string;

  /**
   * 대댓글
   */
  child?: Comment[];

  /**
   * 파일
   */
  files?: Files;
}

export const mockComment: Comment = {
  comment_id: null,
  content_type: ContentType.PLAIN,
  content: "내용입니다.",
  nickname: "관리자",
  uuid: "da414a1d-9085-49e3-be9b-596f696eb5e1",
  user_id: 11,
  parent_uuid: "fbd23180-c017-34a6-822d-026fdeda032e",
  commentable_id: 9,
  commentable_type: "App\\Models\\Story",
  updated_at: "2022-03-22T17:55:13.000000Z",
  created_at: "2022-03-22T17:55:13.000000Z",
  id: 14,
};

export function parseCommentableType(type: string) {
  const last = type.split("\\").reverse()[0].toLowerCase();

  return last as "story";
}
