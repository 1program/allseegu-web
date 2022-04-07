import { Auditable, Entity } from "../common";

/**
 * 사업 개요
 */
export interface RedevOutline extends Entity, Auditable {
  redev_id: number;

  /**
   * 사업 개요 목록
   */
  outline_table: Record<string, string>;

  /**
   * 사업 개요 설명
   */
  outline_desc: string;
}
