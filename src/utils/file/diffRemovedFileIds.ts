import { Files } from "@/models/file";

/**
 * 두 배열을 비교해서 삭제된 파일을 취합한다.
 */
export function diffRemovedFileIds(original: Files, newer: Files) {
  // 반복문 제곱으로 돌지 않도록 Map 데이터형 처리
  const idRecord: Record<number, boolean> = {};

  newer.images.forEach((image) => {
    idRecord[image.id] = true;
  });

  newer.docs.forEach((doc) => {
    idRecord[doc.id] = true;
  });

  const removedIds: number[] = [];

  original.images.forEach((image) => {
    if (idRecord[image.id] !== true) removedIds.push(image.id);
  });

  original.docs.forEach((doc) => {
    if (idRecord[doc.id] !== true) removedIds.push(doc.id);
  });

  return removedIds;
}
