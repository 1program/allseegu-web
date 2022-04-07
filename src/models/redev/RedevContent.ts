import { Ad } from "../ad";
import { Community } from "../community";
import { Estate } from "../estate";
import { News } from "../news";
import { Notice } from "../notice";
import { Story } from "../story";
import { Subscribe } from "../subscribe";
import { Video } from "../video";

import { RedevCondition } from "./RedevCondition";
import { RedevOutline } from "./RedevOutline";

/**
 * 재개발 상세 컨텐츠 타입
 */
export interface RedevContentChild<Model extends string, Data> {
  id: number;
  title: string;
  model: Model;
  type_id: number | null;
  order: number;
  data: Data;
}

/**
 * 재개발 상세 컨텐츠 부모
 */
export interface RedevContentParent<Model extends string, Data> {
  id: number;
  title: string;
  model: Model;
  type_id: number | null;
  order: number;
  child: RedevContentChild<Model, Data>[];
}

/**
 * 재개발 상세 컨텐츠 Union type
 * 타입추론을 위해 사용된다.
 */
export type RedevContent =
  | RedevContentChild<"condition", RedevCondition>
  | RedevContentChild<"outline", RedevOutline>
  | RedevContentChild<"subscribe", Subscribe[]>
  | RedevContentChild<"video", Video[]>
  | RedevContentParent<"community", Community[]>
  | RedevContentParent<"news", News[]>
  | RedevContentChild<"estate", Estate[]>
  | RedevContentChild<"notice", Notice[]>
  | RedevContentChild<"story", Story[]>
  | RedevContentChild<"ad", Ad[]>;
