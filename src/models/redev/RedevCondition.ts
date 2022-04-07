import { Auditable, Entity } from "../common";

/**
 * 사업 조건
 */
export interface RedevCondition extends Entity, Auditable {
  redev_id: number;

  /**
   * 조건1 - 사업 구분
   */
  condition1: string;

  /**
   * 조건2 - 시행 방식
   */
  condition2: string;

  /**
   * 조건3 - 운영 구분
   */
  condition3: string;

  /**
   * 조건4 - 진행 단계
   */
  condition4: string;
}
