import { Story } from "./Story";

export interface StoryDetail extends Story {
  files: {
    images: [];
    docs: [];
  };
  comments: unknown[]; // TODO: Check
  nickname: string;
}
