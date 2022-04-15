import { Comment } from "@/models/comment";

/**
 * 트리를 순회하며 특정 id의 댓글을 삭제한다.
 */
export function removeComment(comments: Comment[], id: number): Comment[] {
  return comments
    .map((comment) =>
      comment.id === id
        ? null
        : ({ ...comment, child: removeComment(comment.child ?? [], id) } as Comment)
    )
    .filter((comment): comment is Comment => comment != null);
}
