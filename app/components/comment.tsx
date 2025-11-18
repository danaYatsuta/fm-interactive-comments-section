"use client";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import Image from "next/image";
import { useRef, useState } from "react";
import TimeAgo, { Formatter } from "react-timeago";
import defaultFormatter from "react-timeago/defaultFormatter";

import BaseButton from "@/app/components/base-button";
import BaseCard from "@/app/components/base-card";
import CommentForm from "@/app/components/comment-form";
import IconButton from "@/app/components/icon-button";
import IconMinus from "@/app/components/icon-minus";
import IconPlus from "@/app/components/icon-plus";
import iconDelete from "@/public/icons/icon-delete.svg";
import iconEdit from "@/public/icons/icon-edit.svg";
import iconReply from "@/public/icons/icon-reply.svg";

export default function Comment({
  commentData,
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
}>) {
  /* ---------------------------------- State --------------------------------- */

  const [shownForm, setShownForm] = useState<"edit" | "none" | "reply">("none");

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

          <div className="flex items-center justify-between text-purple-200">
            <div className="bg-grey-50 flex h-10 w-25 rounded-xl text-lg font-bold">
              <button
                aria-label="Upvote"
                className="w-10 rounded-xl -outline-offset-2 outline-purple-600 hover:text-purple-600"
                type="button"
              >
                <IconPlus />
              </button>

              <p className="grow self-center text-center text-base font-medium text-purple-600">
                <span className="sr-only">Score: </span>
                {commentData.score}
              </p>

              <button
                aria-label="Downvote"
                className="w-10 rounded-xl -outline-offset-2 outline-purple-600 hover:text-purple-600"
                type="button"
              >
                <IconMinus />
              </button>
            </div>

            {canUserEdit ? (
              <div className="flex gap-4">
                <IconButton
                  color="pink"
                  icon={iconDelete}
                  onClick={handleDeleteClick}
                  text="Delete"
                />

                <IconButton icon={iconEdit} text="Edit" />
              </div>
            ) : (
              <IconButton
                icon={iconReply}
                onClick={() => setShownForm("reply")}
                text="Reply"
              />
            )}
          </div>

          <dialog
            className="text-grey-500 fixed right-4 left-4 my-auto w-auto max-w-none flex-col gap-3.5 rounded-lg px-7 py-6 backdrop:bg-black/50 open:flex"
            ref={deleteDialog}
          >
            <h3 className="text-grey-800 text-xl font-medium">
              Delete comment
            </h3>

            <p>
              Are you sure you want to delete this comment? This will remove the
              comment and can&apos;t be undone.
            </p>

            <div className="flex gap-3">
              <BaseButton
                color="grey"
                grow
                onClick={handleDeleteCancelClick}
                text="No, cancel"
              />

              <BaseButton
                color="pink"
                grow
                onClick={handleDeleteConfirmClick}
                text="Yes, delete"
              />
            </div>
          </dialog>
        </article>
      </BaseCard>

      {shownForm === "reply" && (
        <CommentForm
          buttonText="Reply"
          onCancelClick={() => setShownForm("none")}
          showCancelButton={true}
          textAreaPlaceholder="Reply to the comment..."
        />
      )}
    </div>
  );
}

// For some reason, just using nextFormatter without any arguments causes an error: https://github.com/nmn/react-timeago/issues/233

const timeAgoFormatter: Formatter = (
  value,
  unit,
  suffix,
  epochMilliseconds,
  nextFormatter,
  now,
) => {
  if (unit === "second") return "just now";
  return defaultFormatter(
    value,
    unit,
    suffix,
    epochMilliseconds,
    nextFormatter,
    now,
  );
};
