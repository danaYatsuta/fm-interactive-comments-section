import Comment from "@/app/components/comment";
import { FormState } from "@/app/lib/reducers/formReducer";
import { CommentData } from "@/app/types";

export default function AppCommentList({
  commentsData,
  formState,
  onCommentCancelEditOrReplyClick,
  onCommentDeleteClick,
  onCommentEditClick,
  onCommentReplyClick,
  onFormTextAreaValueChange,
}: Readonly<{
  commentsData: CommentData[];
  formState: FormState;
  onCommentCancelEditOrReplyClick: () => void;
  onCommentDeleteClick: (commentId: number) => void;
  onCommentEditClick: (commentId: number) => void;
  onCommentReplyClick: (commentId: number) => void;
  onFormTextAreaValueChange: React.ChangeEventHandler<HTMLTextAreaElement>;
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
          <Comment
            commentData={replyData}
            formState={formState}
            onCancelEditOrReplyClick={onCommentCancelEditOrReplyClick}
            onDeleteClick={() => onCommentDeleteClick(replyData.id)}
            onEditClick={() => onCommentEditClick(replyData.id)}
            onFormTextAreaValueChange={onFormTextAreaValueChange}
            onReplyClick={() => onCommentReplyClick(replyData.id)}
          />
        </li>
      );
    });

    return (
      <li key={topLevelCommentData.id}>
        <Comment
          commentData={topLevelCommentData}
          formState={formState}
          onCancelEditOrReplyClick={onCommentCancelEditOrReplyClick}
          onDeleteClick={() => onCommentDeleteClick(topLevelCommentData.id)}
          onEditClick={() => onCommentEditClick(topLevelCommentData.id)}
          onFormTextAreaValueChange={onFormTextAreaValueChange}
          onReplyClick={() => onCommentReplyClick(topLevelCommentData.id)}
        />

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
