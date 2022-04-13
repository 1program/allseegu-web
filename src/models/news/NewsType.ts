/**
 * 보도자료 하위 타입
 */
export enum NewsType {
  NEWS = 1,
  BLOG = 2,
  BAND = 3,
  LOCAL = 4,
  ETC = 5,
}

/**
 * 보도자료 하위 타입 이름 매핑
 */
export const newsTypeNames = {
  [NewsType.NEWS]: "보도자료",
  [NewsType.BLOG]: "블로그",
  [NewsType.BAND]: "밴드",
  [NewsType.LOCAL]: "지역",
  [NewsType.ETC]: "기타",
};
