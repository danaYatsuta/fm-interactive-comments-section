import type { FormState } from "@/app/lib/reducers/form-reducer";
import type { Comment } from "@/app/types";

import CommentCard from "@/app/components/comment-card";

type FormEventHandlerWithCommentId = (
  e: React.FormEvent<HTMLFormElement>,
  commentId: number,
) => void;

export default function AppCommentList({
  comments,
  formState,
  onCommentDeleteClick,
  onCommentEditClick,
  onCommentFormCancelClick,
  onCommentFormTextAreaValueChange,
  onCommentReplyClick,
  onCreateReplySubmit,
  onEditCommentSubmit,
}: Readonly<{
  comments: Comment[];
  formState: FormState;
  onCommentDeleteClick: (commentId: number) => void;
  onCommentEditClick: (commentId: number) => void;
  onCommentFormCancelClick: () => void;
  onCommentFormTextAreaValueChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  onCommentReplyClick: (commentId: number) => void;
  onCreateReplySubmit: FormEventHandlerWithCommentId;
  onEditCommentSubmit: FormEventHandlerWithCommentId;
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
          <CommentCard
            comment={reply}
            formState={formState}
            onCreateReplySubmit={(e) => onCreateReplySubmit(e, reply.id)}
            onDeleteClick={() => onCommentDeleteClick(reply.id)}
            onEditClick={() => onCommentEditClick(reply.id)}
            onEditCommentSubmit={(e) => onEditCommentSubmit(e, reply.id)}
            onFormCancelClick={onCommentFormCancelClick}
            onFormTextAreaValueChange={onCommentFormTextAreaValueChange}
            onReplyClick={() => onCommentReplyClick(reply.id)}
          />
        </li>
      );
    });

    return (
      <li key={topLevelComment.id}>
        <CommentCard
          comment={topLevelComment}
          formState={formState}
          onCreateReplySubmit={(e) =>
            onCreateReplySubmit(e, topLevelComment.id)
          }
          onDeleteClick={() => onCommentDeleteClick(topLevelComment.id)}
          onEditClick={() => onCommentEditClick(topLevelComment.id)}
          onEditCommentSubmit={(e) =>
            onEditCommentSubmit(e, topLevelComment.id)
          }
          onFormCancelClick={onCommentFormCancelClick}
          onFormTextAreaValueChange={onCommentFormTextAreaValueChange}
          onReplyClick={() => onCommentReplyClick(topLevelComment.id)}
        />

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
