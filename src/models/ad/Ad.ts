import { fileInfoExample1, fileInfoExample2, Files } from "../file";

export interface Ad {
  id: number;
  uuid: string;
  title: string;
  link: string;
  files: Files;
}

export const adExample1: Ad = {
  id: 1,
  uuid: "test1",
  title: "광고 테스트",
  link: "https://google.co.kr",
  files: {
    images: [fileInfoExample1],
    docs: [],
  },
};

export const adExample2: Ad = {
  id: 2,
  uuid: "test2",
  title: "광고 테스트 2",
  link: "https://google.co.kr",
  files: {
    images: [fileInfoExample2],
    docs: [],
  },
};
