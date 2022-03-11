export interface Notice {
  id: number;
  uuid: string;
  user_id: number;
  redev_id: number;
  title: string;
  content_type: string; // TODO: enum check
  content: string;
  link: null; // TODO: CHECK
  is_visible: 0 | 1;
  hits: number;
  created_at: string;
  updated_at: string;
}
