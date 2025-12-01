import CommentCard from "@/app/components/comment-card";
import { Comment } from "@/app/types";

export default function AppCommentList({
  comments,
}: Readonly<{
  comments: Comment[];
}>) {
  /* --------------------------------- Markup --------------------------------- */

  const topLevelComments = comments.filter(
    (commentData) => !commentData.isReply,
  );

  const commentCards = topLevelComments.map((topLevelComment) => {
    const replies = comments.filter(
      (commentData) =>
        commentData.isReply &&
        commentData.parentCommentId === topLevelComment.id,
    );

    const replyCards = replies.map((reply) => {
      return (
        <li key={reply.id}>
          <CommentCard comment={reply} />
        </li>
      );
    });

    return (
      <li key={topLevelComment.id}>
        <CommentCard comment={topLevelComment} />

        {replyCards.length !== 0 && (
          <ul
            aria-label="Replies"
            className="border-grey-100 mt-4 flex flex-col gap-4 border-l-3 pl-4 md:mt-5 md:ml-10 md:pl-10"
          >
            {replyCards}
          </ul>
        )}
      </li>
    );
  });

  return (
    <>
      <ul aria-label="Comments" className="flex flex-col gap-4 md:gap-5">
        {commentCards}
      </ul>
    </>
  );
}
