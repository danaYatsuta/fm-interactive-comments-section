import Image from "next/image";
import { useContext } from "react";

import type { Comment } from "@/app/types";

import BaseCard from "@/app/components/base-card";
import BaseTextArea from "@/app/components/base-text-area";
import ButtonFilled from "@/app/components/button-filled";
import CommentCardControls from "@/app/components/comment-card-controls";
import CommentCardVoteButtons from "@/app/components/comment-card-vote-buttons";
import CommentForm from "@/app/components/comment-form";
import TimeAgoWrapper from "@/app/components/time-ago-wrapper";
import { DialogContext } from "@/app/lib/contexts/DialogContext";
import { FormContext } from "@/app/lib/contexts/FormContext";

export default function CommentCard({
  comment,
}: Readonly<{
  comment: Comment;
}>) {
  /* ------------------------------- Use Context ------------------------------ */

  const [formState, formDispatch] = useContext(FormContext);
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

  /* -------------------------------- Handlers -------------------------------- */

  const shouldAskForConfirmation =
    (formState.type === "edit" &&
      formState.textAreaValue !== comment.content) ||
    (formState.type === "reply" && formState.textAreaValue !== "");

  function handleFormTextAreaValueChange(
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) {
    formDispatch({
      textAreaValue: e.target.value.trim(),
      type: "change_text_area_value",
    });
  }

  function handleCancelEditOrReplyClick() {
    function closeForm() {
      formDispatch({ type: "close" });
    }

    if (formState.type !== null && shouldAskForConfirmation) {
      dialogDispatch({
        formType: formState.type,
        onConfirm: closeForm,
        type: "open_discard_confirmation",
      });
    } else {
      closeForm();
    }
  }

  function handleDeleteClick() {
    dialogDispatch({
      onConfirm: () => {
        console.log(`Deleting comment with id ${comment.id}`);
      },
      type: "open_comment_delete_confirmation",
    });
  }

  function handleEditClick() {
    function openEditForm() {
      formDispatch({
        commentContent: comment.content,
        commentId: comment.id,
        type: "open_edit",
      });
    }

    if (formState.type !== null && shouldAskForConfirmation) {
      dialogDispatch({
        formType: formState.type,
        onConfirm: openEditForm,
        type: "open_discard_confirmation",
      });
    } else {
      openEditForm();
    }
  }

  function handleReplyClick() {
    function openReplyForm() {
      formDispatch({ commentId: comment.id, type: "open_reply" });
    }

    if (formState.type !== null && shouldAskForConfirmation) {
      dialogDispatch({
        formType: formState.type,
        onConfirm: openReplyForm,
        type: "open_discard_confirmation",
      });
    } else {
      openReplyForm();
    }
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

          <div className="xs:gap-4 col-span-2 flex items-center gap-2 text-nowrap md:col-span-1">
            <div className="relative size-8">
              <Image alt="" fill={true} sizes="2rem" src={comment.userAvatar} />
            </div>

            {/* aria-hidden="true" on p and TimeAgo because this text is repeated in h2 above */}

            <p
              aria-hidden="true"
              className="text-grey-800 flex items-center gap-2 font-medium"
            >
              <span className="max-w-28 truncate">{comment.username}</span>
              {canUserEdit && (
                <span className="xs:text-sm flex h-5 items-center rounded-sm bg-purple-600 px-1.5 text-xs text-white">
                  you
                </span>
              )}
            </p>

            <TimeAgoWrapper date={comment.createdAt} />
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
