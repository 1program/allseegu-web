import { FileInfo } from "@/models/file/FileInfo";
import shortid from "shortid";
import { pickFile } from "./pickFile";

export const pickFileInfo = async (accept: string): Promise<FileInfo> => {
  const file = await pickFile(accept);

  return {
    id: shortid(),
    file,
    url: URL.createObjectURL(file),
  };
};
