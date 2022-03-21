export interface News {
  id: number;
  uuid: string;
  user_id: number;
  redev_id: number;
  news_type_id: number;
  title: string;
  content_type: string;
  content: string;
  link: string | null;
  video: string | null;
  is_visible: 1 | 0;
  hits: number;
  created_at: string;
  updated_at: string;
}
