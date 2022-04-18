import { Auditable, Entity } from "../common";

/**
 * 사업개요 테이블 아이템
 */
export interface RedevOutlineTableRow {
  key: string;
  name: string;
  val: string;
}

/**
 * 사업 개요
 */
export interface RedevOutline extends Entity, Auditable {
  redev_id: number;

  /**
   * 사업 개요 목록
   */
  outline_table: RedevOutlineTableRow[];

  /**
   * 사업 개요 설명
   */
  outline_desc: string;
}
