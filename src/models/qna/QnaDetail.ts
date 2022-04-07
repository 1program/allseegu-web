import { Qna } from "./Qna";

export interface QnaDetail extends Qna {
  comments: unknown[]; // TODO: 확인
  files: {
    images: [];
    docs: [];
  };
  nickname: string;
}
