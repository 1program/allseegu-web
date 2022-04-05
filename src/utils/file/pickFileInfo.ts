import shortid from "shortid";
import { pickFile } from "./pickFile";

export interface FileInfo {
  id: string;
  file?: File;
  url?: string;
}

export const pickFileInfo = async (accept: string) => {
  const file = await pickFile(accept);

  return {
    id: shortid(),
    file,
    url: URL.createObjectURL(file),
  };
};
