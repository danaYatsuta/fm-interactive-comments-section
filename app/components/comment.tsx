import Image from "next/image";
import { useContext } from "react";

import type { CommentData } from "@/app/types";

import BaseCard from "@/app/components/base-card";
import BaseTextArea from "@/app/components/base-text-area";
import ButtonFilled from "@/app/components/button-filled";
import CommentControls from "@/app/components/comment-controls";
import CommentForm from "@/app/components/comment-form";
import CommentVoteButtons from "@/app/components/comment-vote-buttons";
import TimeAgoWrapper from "@/app/components/time-ago-wrapper";
import { DialogContext } from "@/app/lib/contexts/DialogContext";
import { FormContext } from "@/app/lib/contexts/FormContext";

export default function Comment({
  commentData,
}: Readonly<{
  commentData: CommentData;
}>) {
  /* ------------------------------- Use Context ------------------------------ */

  const [formState, formDispatch] = useContext(FormContext);
  const [, dialogDispatch] = useContext(DialogContext);

  /* ------------------------------ Derived State ----------------------------- */

  // TODO this is a mock for checking whether comment belongs to current user
  // Replace with actual check when auth is implemented

  const canUserEdit = commentData.username === "juliusomo";

  const formattedScore =
    commentData.score >= 1000
      ? `${Math.round(commentData.score / 1000)}k`
      : commentData.score.toString();

  const isEditFormOpen =
    formState.type === "edit" && formState.commentId === commentData.id;

  const isReplyFormOpen =
    formState.type === "reply" && formState.commentId === commentData.id;

  /* -------------------------------- Handlers -------------------------------- */

  function shouldAskForConfirmation(): boolean {
    switch (formState.type) {
      case "edit": {
        return formState.textAreaValue !== commentData.content;
      }
      case null: {
        return false;
      }
      case "reply": {
        return formState.textAreaValue !== "";
      }
    }
  }

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

    if (formState.type !== null && shouldAskForConfirmation()) {
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
        console.log(`Deleting comment with id ${commentData.id}`);
      },
      type: "open_comment_delete_confirmation",
    });
  }

  function handleEditClick() {
    function openEditForm() {
      formDispatch({
        commentContent: commentData.content,
        commentId: commentData.id,
        type: "open_edit",
      });
    }

    if (formState.type !== null && shouldAskForConfirmation()) {
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
      formDispatch({ commentId: commentData.id, type: "open_reply" });
    }

    if (formState.type !== null && shouldAskForConfirmation()) {
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
          aria-labelledby={`comment-label-${commentData.id}`}
          className="grid gap-4 md:gap-x-6"
          id={`comment-${commentData.id}`}
        >
          <h2 className="sr-only" id={`comment-label-${commentData.id}`}>
            Comment by {commentData.username} left{" "}
            <TimeAgoWrapper date={commentData.createdAt} />
          </h2>

          <div className="xs:gap-4 col-span-2 flex items-center gap-2 text-nowrap md:col-span-1">
            <div className="relative size-8">
              <Image
                alt=""
                fill={true}
                sizes="2rem"
                src={commentData.userAvatar}
              />
            </div>

            {/* aria-hidden="true" on p and TimeAgo because this text is repeated in h2 above */}

            <p
              aria-hidden="true"
              className="text-grey-800 flex items-center gap-2 font-medium"
            >
              <span className="max-w-28 truncate">{commentData.username}</span>
              {canUserEdit && (
                <span className="xs:text-sm flex h-5 items-center rounded-sm bg-purple-600 px-1.5 text-xs text-white">
                  you
                </span>
              )}
            </p>

            <TimeAgoWrapper date={commentData.createdAt} />
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
                {commentData.isReply && (
                  <a
                    aria-label="Jump to parent comment"
                    className="rounded-sm font-medium text-purple-600 hover:underline"
                    href={`#comment-${commentData.replyingToId}`}
                  >
                    @{commentData.replyingToUsername}
                  </a>
                )}{" "}
                {commentData.content}
              </p>

              <div className="self-center justify-self-end md:col-start-3 md:row-start-1">
                <CommentControls
                  canUserEdit={canUserEdit}
                  onDeleteClick={handleDeleteClick}
                  onEditClick={handleEditClick}
                  onReplyClick={handleReplyClick}
                />
              </div>
            </>
          )}

          <div className="col-start-1 row-start-3 md:row-span-2 md:row-start-1">
            <CommentVoteButtons score={formattedScore} />
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
