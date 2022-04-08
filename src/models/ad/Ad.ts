import { Files } from "../file";

export interface Ad {
  id: number;
  uuid: string;
  title: string;
  link: string;
  files: Files;
}
