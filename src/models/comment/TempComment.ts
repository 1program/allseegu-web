import redevImage from "@/images/mocks/redev-image.png";
import { TempChildComment, tempChildComment1, tempChildComment2 } from "./TempChildComment";

export interface TempComment {
  id: number;
  content: string;
  nickname: string;
  mine: boolean;
  images: string[];
  children: TempChildComment[];
}

export const tempComment1: TempComment = {
  id: 1,
  content:
    "새로운 실거래 6.95억은 세끼고 인가요? 새로운 실거래 6.95억은 세끼고 인가요? 새로운 실거래 6.95억은 세끼고 인가요?",
  nickname: "서쪽바다",
  mine: true,
  images: [redevImage, redevImage],
  children: [tempChildComment1, tempChildComment2],
};

export const tempComment2: TempComment = {
  id: 1,
  content:
    "새로운 실거래 6.95억은 세끼고 인가요? 새로운 실거래 6.95억은 세끼고 인가요? 새로운 실거래 6.95억은 세끼고 인가요?",
  nickname: "서쪽바다",
  mine: false,
  images: [redevImage, redevImage, redevImage],
  children: [tempChildComment1, tempChildComment2],
};
