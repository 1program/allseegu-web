import redevImage from "@/images/mocks/redev-image.png";

export interface TempChildComment {
  id: number;
  content: string;
  nickname: string;
  mine: boolean;
  images: string[];
}

export const tempChildComment1 = {
  id: 1,
  content:
    "새로운 실거래 6.95억은 세끼고 인가요? 새로운 실거래 6.95억은 세끼고 인가요? 새로운 실거래 6.95억은 세끼고 인가요?",
  nickname: "서쪽바다",
  mine: false,
  images: [redevImage, redevImage],
};

export const tempChildComment2 = {
  id: 2,
  content:
    "새로운 실거래 6.95억은 세끼고 인가요? 새로운 실거래 6.95억은 세끼고 인가요? 새로운 실거래 6.95억은 세끼고 인가요?",
  nickname: "서쪽바다",
  mine: true,
  images: [redevImage, redevImage],
};

export const tempChildComment3 = {
  id: 1,
  content:
    "새로운 실거래 6.95억은 세끼고 인가요? 새로운 실거래 6.95억은 세끼고 인가요? 새로운 실거래 6.95억은 세끼고 인가요?",
  nickname: "서쪽바다",
  mine: false,
  images: [redevImage, redevImage],
};
