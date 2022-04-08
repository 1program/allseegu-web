import { Comment } from "../comment";
import { Files } from "../file";
import { Story } from "./Story";

export interface StoryDetail extends Story {
  files: Files;
  comments: Comment[];
  nickname: string;
}
