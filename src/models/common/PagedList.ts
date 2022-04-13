/**
 * 페이지 단위로 잘린 목록 데이터를 표현하는 모델이다.
 */
export interface PagedList<T> {
  current_page: number;
  data: T[];
  last_page: number;
  last_page_url: string;
  next_page: number | null;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page: number | null;
  prev_page_url: string | null;
  total: number;
}
