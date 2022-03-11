/**
 * 페이지 단위로 잘린 목록 데이터를 표현하는 모델이다.
 */
export interface PagedList<T> {
  data: T[];

  from: number;
  to: number;
  per_page: number;
  total: number;

  current_page: number;
  first_page: number;
  last_page: number;

  path: string;

  first_page_url: string | null;
  prev_page_url: string | null;
  next_page_url: string | null;
  last_page_url: string | null;

  links: { url: string | null; label: string; active: boolean }[];
}
