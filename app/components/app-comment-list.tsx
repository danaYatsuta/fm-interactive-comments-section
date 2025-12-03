import { useReducer } from "react";

import CommentCard from "@/app/components/comment-card";
import formReducer, {
  FormAction,
  FormState,
} from "@/app/lib/reducers/form-reducer";
import { Comment } from "@/app/types";

export type OpenDialogFunction = (options: {
  currentFormStateType: NonNullable<FormState["type"]>;
  onConfirm: () => void;
}) => void;

export default function AppCommentList({
  comments,
  onCommentDeleteClick,
  openDialog,
}: Readonly<{
  comments: Comment[];
  onCommentDeleteClick: (commentId: number) => void;
  openDialog: OpenDialogFunction;
}>) {
  /* ---------------------------------- State --------------------------------- */

  const [formState, formDispatch] = useReducer(formReducer, {
    commentId: null,
    textAreaValue: "",
    type: null,
  });

  /* ---------------------------- Helper Functions ---------------------------- */

  /**
   * Wraps a formDispatch call inside logic that first checks for whether any other form is currently open and whether it is "dirty";
   * if it is, opens a dialog where the confirm button would call formDispatch; otherwise, calls formDispatch immediately.
   *
   * @param formAction
   */
  function formDispatchWithConfirmation(formAction: FormAction) {
    const shouldAskForConfirmation =
      (formState.type === "edit" &&
        formState.textAreaValue.trim() !== formState.commentContent) ||
      (formState.type === "reply" && formState.textAreaValue.trim() !== "");

    if (formState.type !== null && shouldAskForConfirmation) {
      openDialog({
        currentFormStateType: formState.type,
        onConfirm: () => formDispatch(formAction),
      });
    } else {
      formDispatch(formAction);
    }
  }

  /* -------------------------------- Handlers -------------------------------- */

  function handleCommentFormTextAreaValueChange(
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) {
    formDispatch({
      textAreaValue: e.target.value,
      type: "change_text_area_value",
    });
  }

  function handleCommentEditClick(commentId: number) {
    const comment = comments.find((comment) => comment.id === commentId);

    if (comment === undefined) return;

    formDispatchWithConfirmation({
      commentContent: comment.content,
      commentId,
      type: "open_edit",
    });
  }

  function handleCommentReplyClick(commentId: number) {
    formDispatchWithConfirmation({
      commentId,
      type: "open_reply",
    });
  }

  function handleCommentFormCancelClick() {
    formDispatchWithConfirmation({ type: "close" });
  }

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
            onDeleteClick={() => onCommentDeleteClick(reply.id)}
            onEditClick={() => handleCommentEditClick(reply.id)}
            onFormCancelClick={handleCommentFormCancelClick}
            onFormTextAreaValueChange={handleCommentFormTextAreaValueChange}
            onReplyClick={() => handleCommentReplyClick(reply.id)}
          />
        </li>
      );
    });

    return (
      <li key={topLevelComment.id}>
        <CommentCard
          comment={topLevelComment}
          formState={formState}
          onDeleteClick={() => onCommentDeleteClick(topLevelComment.id)}
          onEditClick={() => handleCommentEditClick(topLevelComment.id)}
          onFormCancelClick={handleCommentFormCancelClick}
          onFormTextAreaValueChange={handleCommentFormTextAreaValueChange}
          onReplyClick={() => handleCommentReplyClick(topLevelComment.id)}
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
