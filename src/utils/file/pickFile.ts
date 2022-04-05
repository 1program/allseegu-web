import { css } from "@emotion/css";

export const pickFile = (accept: string) => {
  return new Promise<File>((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;
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
        input.remove();

        resolve(file);
      }
    });

    document.body.appendChild(input);
    input.click();
  });
};
