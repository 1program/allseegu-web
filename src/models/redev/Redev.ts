/**
 * 재개발 정보
 */
export interface Redev {
  id: number;

  uuid: string;

  user_id: number | null;

  title: string;

  enconet_uuid: number | null;

  district: "at"; // TODO: 확인 필요

  geometry_points: { x: number; y: number }[];

  geometry_shape: "polyline";

  condition1: string;

  condition2: string;

  condition3: string;

  condition4: string;

  condition_visible: number;

  outline_desc: string;

  outline_visible: number;

  is_issue: 0 | 1;

  is_newtown: 0 | 1;

  is_visible: 0 | 1;

  /**
   * 조회수
   */
  hits: number;

  /**
   * 등록일
   */
  created_at: string;

  /**
   * 수정일
   */
  updated_at: string;
}
