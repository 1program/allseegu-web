import { Comment } from "@/models/comment";

/**
 * 트리를 순회하며 댓글을 추가한다.
 */
export function addComment(comments: Comment[], newComment: Comment): Comment[] {
  if (newComment.comment_id == null) {
    return [...comments, newComment];
  }

  return comments.map((comment) =>
    comment.id === newComment.comment_id
      ? { ...comment, child: [...(comment.child ?? []), newComment] }
      : comment
  );
}
