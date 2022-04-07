import { Auditable, ContentType, Entity } from "../common";

/**
 * 전문가 의견
 */
export interface Subscribe extends Entity, Auditable {
  redev_id: number;

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
   * 공지사항인가?
   */
  is_notice: 1 | 0;

  /**
   * 노출 여부
   */
  is_visible: 1 | 0;

  /**
   * 조회수
   */
  hits: number;
}
