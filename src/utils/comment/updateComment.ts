import { Comment } from "@/models/comment";

/**
 * 트리를 순회하며 댓글을 업데이트 한다.
 */
export function updateComment(comments: Comment[], updated: Comment): Comment[] {
  return comments.map((comment) =>
    comment.id === updated.id
      ? updated
      : { ...comment, child: updateComment(comment.child ?? [], updated) }
  );
}
