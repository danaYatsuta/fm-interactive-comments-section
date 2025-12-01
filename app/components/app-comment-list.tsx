import Comment from "@/app/components/comment";
import { CommentData } from "@/app/types";

export default function AppCommentList({
  commentsData,
}: Readonly<{
  commentsData: CommentData[];
}>) {
  /* --------------------------------- Markup --------------------------------- */

  const topLevelCommentsData = commentsData.filter(
    (commentData) => !commentData.isReply,
  );

  const comments = topLevelCommentsData.map((topLevelCommentData) => {
    const repliesData = commentsData.filter(
      (commentData) =>
        commentData.isReply &&
        commentData.parentCommentId === topLevelCommentData.id,
    );

    const replies = repliesData.map((replyData) => {
      return (
        <li key={replyData.id}>
          <Comment commentData={replyData} />
        </li>
      );
    });

    return (
      <li key={topLevelCommentData.id}>
        <Comment commentData={topLevelCommentData} />

        {replies.length !== 0 && (
          <ul
            aria-label="Replies"
            className="border-grey-100 mt-4 flex flex-col gap-4 border-l-3 pl-4 md:mt-5 md:ml-10 md:pl-10"
          >
            {replies}
          </ul>
        )}
      </li>
    );
  });

  return (
    <>
      <ul aria-label="Comments" className="flex flex-col gap-4 md:gap-5">
        {comments}
      </ul>
    </>
  );
}
