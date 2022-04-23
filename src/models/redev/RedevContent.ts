import { Ad } from "../ad";
import { Community, CommunityType } from "../community";
import { Estate } from "../estate";
import { News, NewsType } from "../news";
import { Notice } from "../notice";
import { Story } from "../story";
import { Subscribe } from "../subscribe";
import { Video } from "../video";
import { RedevCondition } from "./RedevCondition";
import { RedevOutline } from "./RedevOutline";

/**
 * 재개발 상세 컨텐츠 타입
 */
export interface RedevContentChild<Model extends string, Data, TypeId> {
  id: number;
  title: string;
  model: Model;
  type_id: TypeId | null;
  order: number;
  data: Data;
}

/**
 * 재개발 상세 컨텐츠 부모
 */
export interface RedevContentParent<Model extends string, Data, TypeId> {
  id: number;
  title: string;
  model: Model;
  type_id: number | null;
  order: number;
  child: RedevContentChild<Model, Data, TypeId>[];
}

/**
 * 재개발 상세 컨텐츠 Union type
 * 타입추론을 위해 사용된다.
 */
export type RedevContent =
  | RedevContentChild<"condition", RedevCondition, number>
  | RedevContentChild<"outline", RedevOutline, number>
  | RedevContentChild<"subscribe", Subscribe[], number>
  | RedevContentChild<"video", Video[], number>
  | RedevContentParent<"community", Community[], CommunityType>
  | RedevContentParent<"news", News[], NewsType>
  | RedevContentChild<"estate", Estate[], number>
  | RedevContentChild<"notice", Notice[], number>
  | RedevContentChild<"story", Story[], number>
  | RedevContentChild<"ad", Ad[], number>;
