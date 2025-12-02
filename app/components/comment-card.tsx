import { useContext, useReducer } from "react";

import type { Comment } from "@/app/types";

import BaseCard from "@/app/components/base-card";
import BaseTextArea from "@/app/components/base-text-area";
import ButtonFilled from "@/app/components/button-filled";
import CommentCardControls from "@/app/components/comment-card-controls";
import CommentCardHeader from "@/app/components/comment-card-header";
import CommentCardVoteButtons from "@/app/components/comment-card-vote-buttons";
import CommentForm from "@/app/components/comment-form";
import TimeAgoWrapper from "@/app/components/time-ago-wrapper";
import { DialogContext } from "@/app/lib/contexts/DialogContext";
import formReducer, { FormAction } from "@/app/lib/reducers/formReducer";

export default function CommentCard({
  comment,
}: Readonly<{
  comment: Comment;
}>) {
  /* ------------------------------- Use Context ------------------------------ */

  const [formState, formDispatch] = useReducer(formReducer, {
    commentId: null,
    textAreaValue: "",
    type: null,
  });
  const [, dialogDispatch] = useContext(DialogContext);

  /* ------------------------------ Derived State ----------------------------- */

  // TODO this is a mock for checking whether comment belongs to current user
  // Replace with actual check when auth is implemented

  const canUserEdit = comment.username === "juliusomo";

  const formattedScore =
    comment.score >= 1000
      ? `${Math.round(comment.score / 1000)}k`
      : comment.score.toString();

  const isEditFormOpen =
    formState.type === "edit" && formState.commentId === comment.id;

  const isReplyFormOpen =
    formState.type === "reply" && formState.commentId === comment.id;

  /* ---------------------------- Helper Functions ---------------------------- */

  type OpenCloseFormActionType = Exclude<
    FormAction["type"],
    "change_text_area_value"
  >;

  /**
   * Object of formDispatch calls already filled with this comment's data.
   */
  const formActions: Record<OpenCloseFormActionType, () => void> = {
    close: () => {
      formDispatch({ type: "close" });
    },
    open_edit: () => {
      formDispatch({
        commentContent: comment.content,
        commentId: comment.id,
        type: "open_edit",
      });
    },
    open_reply: () => {
      formDispatch({ commentId: comment.id, type: "open_reply" });
    },
  };

  /**
   * Wraps a formDispatch call inside logic that first checks for whether any other form is currently open and whether it is "dirty";
   * if it is, dispatches a dialog where the confirm button would call formDispatch; otherwise, calls formDispatch immediately.
   *
   * @param formActionType
   */
  function formDispatchWrapper(formActionType: OpenCloseFormActionType) {
    const shouldAskForConfirmation =
      (formState.type === "edit" &&
        formState.textAreaValue.trim() !== formState.commentContent) ||
      (formState.type === "reply" && formState.textAreaValue.trim() !== "");

    if (shouldAskForConfirmation) {
      dialogDispatch({
        dialogType:
          formState.type === "edit" ? "discard_edit" : "discard_reply",
        onConfirm: formActions[formActionType],
        type: "open",
      });
    } else {
      formActions[formActionType]();
    }
  }

  /* -------------------------------- Handlers -------------------------------- */

  function handleFormTextAreaValueChange(
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) {
    formDispatch({
      textAreaValue: e.target.value,
      type: "change_text_area_value",
    });
  }

  function handleDeleteClick() {
    dialogDispatch({
      dialogType: "delete_comment",
      onConfirm: () => {
        console.log(`Deleting comment with id ${comment.id}`);
      },
      type: "open",
    });
  }

  function handleEditClick() {
    formDispatchWrapper("open_edit");
  }

  function handleReplyClick() {
    formDispatchWrapper("open_reply");
  }

  function handleCancelEditOrReplyClick() {
    formDispatchWrapper("close");
  }

  /* --------------------------------- Markup --------------------------------- */

  return (
    <div className="flex flex-col gap-2">
      {/* 
        Using aria-labelledby on visually hidden element instead of aria-label
        because there is no way to put time ago inside attribute
      */}

      <BaseCard>
        <article
          aria-labelledby={`comment-label-${comment.id}`}
          className="grid gap-4 md:gap-x-6"
          id={`comment-${comment.id}`}
        >
          <h2 className="sr-only" id={`comment-label-${comment.id}`}>
            Comment by {comment.username} left{" "}
            <TimeAgoWrapper date={comment.createdAt} />
          </h2>

          <div className="col-span-2 md:col-span-1">
            <CommentCardHeader
              canUserEdit={canUserEdit}
              createdAt={comment.createdAt}
              userAvatar={comment.userAvatar}
              username={comment.username}
            />
          </div>

          {isEditFormOpen ? (
            // row-start-2 might seem redundant but everything breaks without it for some reason
            <form className="col-span-2 col-start-1 row-span-2 row-start-2 grid grid-cols-subgrid grid-rows-subgrid gap-4 md:col-start-2">
              <div className="col-span-2">
                <BaseTextArea
                  onChange={handleFormTextAreaValueChange}
                  placeholder="Edit the comment..."
                  value={formState.textAreaValue}
                />
              </div>

              <div className="col-start-2 flex justify-end gap-2">
                <ButtonFilled
                  color="pink"
                  onClick={handleCancelEditOrReplyClick}
                  text="Cancel"
                />

                <ButtonFilled text="Update" type="submit" />
              </div>
            </form>
          ) : (
            <>
              <p className="col-span-2">
                {comment.isReply && (
                  <a
                    aria-label="Jump to parent comment"
                    className="rounded-sm font-medium text-purple-600 hover:underline"
                    href={`#comment-${comment.replyingToId}`}
                  >
                    @{comment.replyingToUsername}
                  </a>
                )}{" "}
                {comment.content}
              </p>

              <div className="self-center justify-self-end md:col-start-3 md:row-start-1">
                <CommentCardControls
                  canUserEdit={canUserEdit}
                  onDeleteClick={handleDeleteClick}
                  onEditClick={handleEditClick}
                  onReplyClick={handleReplyClick}
                />
              </div>
            </>
          )}

          <div className="col-start-1 row-start-3 md:row-span-2 md:row-start-1">
            <CommentCardVoteButtons score={formattedScore} />
          </div>
        </article>
      </BaseCard>

      {isReplyFormOpen && (
        <CommentForm
          buttonText="Reply"
          onCancelClick={handleCancelEditOrReplyClick}
          onTextAreaChange={handleFormTextAreaValueChange}
          showCancelButton={true}
          textAreaPlaceholder="Reply to the comment..."
          textAreaValue={formState.textAreaValue}
        />
      )}
    </div>
  );
}
