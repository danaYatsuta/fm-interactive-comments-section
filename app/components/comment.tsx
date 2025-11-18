"use client";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import Image from "next/image";
import { useRef } from "react";
import TimeAgo from "react-timeago";

import BaseButton from "@/app/components/base-button";
import BaseCard from "@/app/components/base-card";
import BaseTextArea from "@/app/components/base-text-area";
import CommentControls from "@/app/components/comment-controls";
import CommentForm from "@/app/components/comment-form";
import DeleteDialog from "@/app/components/delete-dialog";
import timeAgoFormatter from "@/app/lib/timeAgoFormatter";

export default function Comment({
  commentData,
  isEditFormShown,
  isReplyFormShown,
  onCancelClick,
  onEditClick,
  onReplyClick,
}: Readonly<{
  commentData: {
    content: string;
    createdAt: string;
    id: number;
    replyingToId?: number;
    replyingToUser?: string;
    score: number;
    userImageSrc: string;
    username: string;
  };
  isEditFormShown: boolean;
  isReplyFormShown: boolean;
  onCancelClick: () => void;
  onEditClick: () => void;
  onReplyClick: () => void;
}>) {
  /* ------------------------------ Derived State ----------------------------- */

  // TODO this is a mock for checking whether comment belongs to current user
  // Replace with actual check when auth is implemented

  const canUserEdit = commentData.username === "juliusomo";

  const date = new Date(commentData.createdAt);
  const dateTimeFormat = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  });

  const formattedDate = dateTimeFormat.format(date);

  /* -------------------------------- Handlers -------------------------------- */

  const deleteDialog = useRef<HTMLDialogElement>(null);

  function handleDeleteClick() {
    if (deleteDialog.current === null) return;

    deleteDialog.current.showModal();
    disableBodyScroll(deleteDialog.current);
  }

  function handleDeleteCancelClick() {
    if (deleteDialog.current === null) return;

    deleteDialog.current.close();
    enableBodyScroll(deleteDialog.current);
  }

  function handleDeleteConfirmClick() {
    if (deleteDialog.current === null) return;

    deleteDialog.current.close();
    enableBodyScroll(deleteDialog.current);
  }

  /* --------------------------------- Markup --------------------------------- */

  return (
    <div className="flex flex-col gap-2">
      {
        // Using aria-labelledby on visually hidden element instead of aria-label
        // because there is no way to put time ago inside attribute
      }
      <BaseCard>
        <article
          aria-labelledby={`comment-label-${commentData.id}`}
          className="flex flex-col gap-4"
          id={`comment-${commentData.id}`}
        >
          <h2 className="sr-only" id={`comment-label-${commentData.id}`}>
            Comment by {commentData.username} left{" "}
            <TimeAgo
              date={commentData.createdAt}
              formatter={timeAgoFormatter}
              minPeriod={60}
              title={formattedDate}
            />
          </h2>

          <div className="flex items-center gap-4">
            <div className="relative size-8">
              <Image
                alt=""
                fill={true}
                sizes="2rem"
                src={commentData.userImageSrc}
              />
            </div>

            <p
              aria-hidden="true"
              className="text-grey-800 flex items-center gap-2 font-medium"
            >
              {commentData.username}
              {canUserEdit && (
                <span className="flex h-5 items-center rounded-sm bg-purple-600 px-1.5 text-sm text-white">
                  you
                </span>
              )}
            </p>

            <TimeAgo
              aria-hidden="true"
              date={commentData.createdAt}
              formatter={timeAgoFormatter}
              minPeriod={60}
              title={formattedDate}
            />
          </div>

          {isEditFormShown ? (
            <form className="flex flex-col gap-4">
              <BaseTextArea
                defaultValue={commentData.content}
                placeholder="Edit the comment..."
              />

              <div className="flex justify-end gap-3">
                <BaseButton
                  color="pink"
                  onClick={onCancelClick}
                  text="Cancel"
                />

                <BaseButton text="Update" type="submit" />
              </div>
            </form>
          ) : (
            <>
              <p>
                {commentData.replyingToUser && (
                  <a
                    aria-label="Jump to parent comment"
                    className="rounded-sm font-medium text-purple-600 hover:underline"
                    href={`#comment-${commentData.replyingToId}`}
                  >
                    @{commentData.replyingToUser}
                  </a>
                )}{" "}
                {commentData.content}
              </p>

              <CommentControls
                canUserEdit={canUserEdit}
                onDeleteClick={handleDeleteClick}
                onEditClick={onEditClick}
                onReplyClick={onReplyClick}
                score={commentData.score}
              />
            </>
          )}
        </article>
      </BaseCard>

      {isReplyFormShown && (
        <CommentForm
          buttonText="Reply"
          onCancelClick={onCancelClick}
          showCancelButton={true}
          textAreaPlaceholder="Reply to the comment..."
        />
      )}

      <DeleteDialog
        onCancelClick={handleDeleteCancelClick}
        onConfirmClick={handleDeleteConfirmClick}
        ref={deleteDialog}
      />
    </div>
  );
}
