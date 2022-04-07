import { Auditable, Entity } from "../common";

export interface Favor extends Entity, Auditable {
  redev_id: number;
  subscribe_alim: 1 | 0;
  video_alim: 1 | 0;
  community_alim: 1 | 0;
  news_alim: 1 | 0;
  notice_alim: 1 | 0;
  story_alim: 1 | 0;
  redev_title: string;
}
