// https://gist.github.com/oreoshake/ccb3d14d7292f56ca0ef
export function getFileThumbnail(file: File) {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();

    reader.addEventListener("loadend", () => {
      resolve(reader.result as string);
    });

    reader.readAsDataURL(file);
  });
}
