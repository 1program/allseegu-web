import { Comment } from "@/models/comment";

/**
 * 두 댓글목록을 비교하여, 새로 추가된 댓글 목록을 파악한다.
 */
export function diffNewComments(previous: Comment[], current: Comment[]) {
  const previousById: Record<string, Comment> = {};
  const added: Comment[] = [];

  previous.forEach((item) => {
    previousById[item.id] = item;
  });

  current.forEach((item) => {
    const previousItem = previousById[item.id];

    if (previousItem == null) {
      added.push(item);
    }

    if (item.child != null) {
      added.push(...diffNewComments(previousItem.child ?? [], item.child ?? []));
    }
  });

  return added;
}
