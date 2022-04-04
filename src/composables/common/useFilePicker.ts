import { css } from "@emotion/css";
import shortid from "shortid";
import { Ref, ref } from "vue";

export interface FileInfo {
  id: string;
  file?: File;
  thumbnail?: string;
}

export function useFilePicker({ accept }: { accept: Ref<string> }) {
  const files = ref<FileInfo[]>([]);

  const pick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept.value;
    input.multiple = false;
    input.classList.add(
      css({
        position: "absolute",
        top: "-9999px",
      })
    );
    input.addEventListener("change", (e) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];

      if (file != null) {
        files.value.push({
          id: shortid(),
          file,
          thumbnail: URL.createObjectURL(file),
        });

        input.remove();
      }
    });
    input.click();
  };

  const remove = (id: string) => {
    files.value = files.value.filter((file) => file.id !== id);
  };

  return {
    files,
    pick,
    remove,
  };
}
