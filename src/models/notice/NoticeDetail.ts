import { Notice } from "./Notice";

export interface NoticeDetail extends Notice {
  files: {
    images: [];
    docs: [];
  };
}
