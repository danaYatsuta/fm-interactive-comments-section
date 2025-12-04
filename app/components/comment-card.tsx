import { Flipped } from "react-flip-toolkit";

import type { FormState } from "@/app/lib/reducers/form-reducer";
import type { Comment } from "@/app/types";

import BaseCard from "@/app/components/base-card";
import BaseTextArea from "@/app/components/base-text-area";
import ButtonFilled from "@/app/components/button-filled";
import CommentCardControls from "@/app/components/comment-card-controls";
import CommentCardHeader from "@/app/components/comment-card-header";
import CommentCardVoteButtons from "@/app/components/comment-card-vote-buttons";
import CommentForm from "@/app/components/comment-form";
import TimeAgoWrapper from "@/app/components/time-ago-wrapper";

export default function CommentCard({
  comment,
  formState,
  onCreateReplySubmit,
  onDeleteClick,
  onEditClick,
  onEditCommentSubmit,
  onFormCancelClick,
  onFormTextAreaValueChange,
  onReplyClick,
}: Readonly<{
  comment: Comment;
  formState: FormState;
  onCreateReplySubmit: React.FormEventHandler<HTMLFormElement>;
  onDeleteClick: () => void;
  onEditClick: () => void;
  onEditCommentSubmit: React.FormEventHandler<HTMLFormElement>;
  onFormCancelClick: () => void;
  onFormTextAreaValueChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  onReplyClick: () => void;
}>) {
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
            <form
              className="col-span-2 col-start-1 row-span-2 row-start-2 grid grid-cols-subgrid grid-rows-subgrid gap-4 md:col-start-2"
              onSubmit={onEditCommentSubmit}
            >
              <div className="col-span-2">
                <BaseTextArea
                  onChange={onFormTextAreaValueChange}
                  placeholder="Edit the comment..."
                  value={formState.textAreaValue}
                />
              </div>

              <div className="col-start-2 flex justify-end gap-2">
                <ButtonFilled
                  color="pink"
                  onClick={onFormCancelClick}
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
                  onDeleteClick={onDeleteClick}
                  onEditClick={onEditClick}
                  onReplyClick={onReplyClick}
                />
              </div>
            </>
          )}

          <div className="col-start-1 row-start-3 md:row-span-2 md:row-start-1">
            <CommentCardVoteButtons score={formattedScore} />
          </div>
        </article>
      </BaseCard>

      <div
        className={`${isReplyFormOpen ? "" : "hidden"} duration-500 not-motion-reduce:transition starting:opacity-0`}
      >
        <CommentForm
          buttonText="Reply"
          isFlipped={false}
          onCancelClick={onFormCancelClick}
          onSubmit={onCreateReplySubmit}
          onTextAreaChange={onFormTextAreaValueChange}
          showCancelButton={true}
          textAreaPlaceholder="Reply to the comment..."
          textAreaValue={formState.textAreaValue}
        />
      </div>
    </div>
  );
}
