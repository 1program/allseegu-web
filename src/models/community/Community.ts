import { Auditable, ContentType, Entity } from "../common";

export interface Community extends Entity, Auditable {
  redev_id: number;

  /**
   * 하위 분류 ID
   */
  community_type_id: number; // TODO: Check

  /**
   *
   */
  cafe_type: string | null; // TODO: Check

  /**
   * 제목
   */
  title: string;

  /**
   * 작성 유형
   */
  content_type: ContentType;

  /**
   * 내용
   */
  content: string;

  /**
   * 링크
   */
  link: string | null;

  /**
   * 톡방 비밀번호
   */
  password: string | null;

  /**
   * 노출 여부
   */
  is_visible: number;

  /**
   * 조회수
   */
  hits: number;
}
