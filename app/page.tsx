"use client";

import { useState } from "react";

import AppDialog from "@/app/components/app-dialog";
import { AppDialogProps } from "@/app/components/app-dialog";
import Comment from "@/app/components/comment";
import CommentForm from "@/app/components/comment-form";
import commentsData from "@/app/exampleData";

interface ShownForm {
  id: null | number;
  type: "edit" | "reply" | null;
}

export default function Home() {
  /* ---------------------------------- State --------------------------------- */

  // Info about shown edit or reply form; only one edit or reply form can be shown at once
  // id is the id of comment that is being replied to or edited
  const [shownForm, setShownForm] = useState<ShownForm>({
    id: null,
    type: null,
  });

  const [dialogState, setDialogState] = useState<AppDialogProps>({
    confirmButtonText: "",
    heading: "",
    isShown: false,
    message: "",
    onCancelClick: () => {},
    onConfirmClick: () => {},
  });

  /* -------------------------------- Handlers -------------------------------- */

  function handleCancelEditOrReplyClick() {
    setShownForm({ id: null, type: null });
  }

  // Very terrible but not sure how to refactor yet
  function handleDeleteClick() {
    const nextDialogState: AppDialogProps = {
      confirmButtonText: "Yes, delete",
      heading: "Delete comment",
      isShown: true,
      message:
        "Are you sure you want to delete this comment? This will remove the comment and can't be undone.",
      onCancelClick: () => {
        setDialogState({
          ...nextDialogState,
          isShown: false,
        });
      },
      onConfirmClick: () => {
        setDialogState({
          ...nextDialogState,
          isShown: false,
        });
      },
    };

    setDialogState(nextDialogState);
  }

  function handleEditClick(id: number) {
    if (shownForm.id === null) {
      setShownForm({ id, type: "edit" });
      return;
    }

    const nextDialogState: AppDialogProps = {
      confirmButtonText: "Yes, proceed",
      heading: shownForm.type === "edit" ? "Discard changes" : "Discard reply",
      isShown: true,
      message:
        shownForm.type === "edit"
          ? "Are you sure you want to stop editing this comment? This will discard the comment changes and can't be undone."
          : "Are you sure you want to stop replying? This will discard the reply draft and can't be undone.",
      onCancelClick: () => {
        setDialogState({
          ...nextDialogState,
          isShown: false,
        });
      },
      onConfirmClick: () => {
        setDialogState({
          ...nextDialogState,
          isShown: false,
        });

        setShownForm({ id, type: "edit" });
      },
    };

    setDialogState(nextDialogState);
  }

  function handleReplyClick(id: number) {
    if (shownForm.id === null) {
      setShownForm({ id, type: "reply" });
      return;
    }

    const nextDialogState: AppDialogProps = {
      confirmButtonText: "Yes, proceed",
      heading: shownForm.type === "edit" ? "Discard changes" : "Discard reply",
      isShown: true,
      message:
        shownForm.type === "edit"
          ? "Are you sure you want to stop editing this comment? This will discard the comment changes and can't be undone."
          : "Are you sure you want to stop replying? This will discard the reply draft and can't be undone.",
      onCancelClick: () => {
        setDialogState({
          ...nextDialogState,
          isShown: false,
        });
      },
      onConfirmClick: () => {
        setDialogState({
          ...nextDialogState,
          isShown: false,
        });

        setShownForm({ id, type: "reply" });
      },
    };

    setDialogState(nextDialogState);
  }

  /* --------------------------------- Markup --------------------------------- */

  const comments = commentsData.comments.map((comment) => {
    const replies = comment.replies?.map((reply) => {
      return (
        <li key={reply.id}>
          <Comment
            commentData={reply}
            isEditFormShown={
              shownForm.type === "edit" && reply.id === shownForm.id
            }
            isReplyFormShown={
              shownForm.type === "reply" && reply.id === shownForm.id
            }
            onCancelEditOrReplyClick={handleCancelEditOrReplyClick}
            onDeleteClick={handleDeleteClick}
            onEditClick={() => handleEditClick(reply.id)}
            onReplyClick={() => handleReplyClick(reply.id)}
          />
        </li>
      );
    });

    return (
      <li key={comment.id}>
        <Comment
          commentData={comment}
          isEditFormShown={
            shownForm.type === "edit" && comment.id === shownForm.id
          }
          isReplyFormShown={
            shownForm.type === "reply" && comment.id === shownForm.id
          }
          onCancelEditOrReplyClick={handleCancelEditOrReplyClick}
          onDeleteClick={handleDeleteClick}
          onEditClick={() => handleEditClick(comment.id)}
          onReplyClick={() => handleReplyClick(comment.id)}
        />

        {replies?.length !== 0 && (
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
    <main className="mx-4 my-8 flex flex-col gap-4 md:mx-auto md:my-16 md:w-184 md:gap-5">
      <h1 className="sr-only">
        Frontend Mentor | Interactive comments section
      </h1>

      <ul aria-label="Comments" className="flex flex-col gap-4 md:gap-5">
        {comments}
      </ul>

      <CommentForm buttonText="Send" textAreaPlaceholder="Add a comment..." />

      <AppDialog {...dialogState} />
    </main>
  );
}
