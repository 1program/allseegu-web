import { Files } from "../file";
import { Qna } from "./Qna";

export interface QnaDetail extends Qna {
  comments: Comment[];
  files: Files;
  nickname: string;
}
