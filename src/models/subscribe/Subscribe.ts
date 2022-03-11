export interface Subscribe {
  id: number;
  uuid: string;
  user_id: number;
  redev_id: number;
  title: string;
  content_type: "plain"; // TODO: Check
  content: string;
  link: null; // TODO: Check
  is_visible: 1 | 0;
  hits: number;
  created_at: string;
  updated_at: string;
}
