// This component shouldnt exist because currently basically the entire page is a client component and that's bad
// TODO get rid of this and do proper server and client component interleaving

"use client";

import { useReducer } from "react";
import { Flipper } from "react-flip-toolkit";

import type { FormAction } from "@/app/lib/reducers/form-reducer";
import type { Comment } from "@/app/types";

import AppCommentList from "@/app/components/app-comment-list";
import AppDialog from "@/app/components/app-dialog";
import CommentForm from "@/app/components/comment-form";
import { dialogReducer } from "@/app/lib/reducers/dialog-reducer";
import formReducer from "@/app/lib/reducers/form-reducer";

export default function TemporaryClientComponent({
  comments,
}: {
  readonly comments: Comment[];
}) {
  /* ---------------------------------- State --------------------------------- */

  const [formState, formDispatch] = useReducer(formReducer, {
    commentId: null,
    textAreaValue: "",
    type: null,
  });

  const [dialogState, dialogDispatch] = useReducer(dialogReducer, {
    confirmButtonText: "",
    heading: "",
    isOpen: false,
    message: "",
    onConfirm: () => {},
  });

  /* ---------------------------- Helper Functions ---------------------------- */

  /**
   * Wraps a formDispatch call inside logic that first checks for whether any other form is currently open and whether it is "dirty";
   * if it is, dispatches a dialog where the confirm button would call formDispatch; otherwise, calls formDispatch immediately.
   *
   * @param formAction
   */
  function formDispatchWithConfirmation(formAction: FormAction) {
    const shouldAskForConfirmation =
      (formState.type === "edit" &&
        formState.textAreaValue.trim() !== formState.commentContent) ||
      (formState.type === "reply" && formState.textAreaValue.trim() !== "");

    if (formState.type !== null && shouldAskForConfirmation) {
      dialogDispatch({
        dialogType:
          formState.type === "edit" ? "discard_edit" : "discard_reply",
        onConfirm: () => {
          formDispatch(formAction);
        },
        type: "open",
      });
    } else {
      formDispatch(formAction);
    }
  }

  /* -------------------- Handlers - Comment Button Clicks -------------------- */

  function handleCommentDeleteClick(commentId: number) {
    dialogDispatch({
      dialogType: "delete_comment",
      onConfirm: () => {
        console.log(`Deleting comment with id ${commentId}`);
      },
      type: "open",
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

  /* --------------------- Handlers - Comment Form Events --------------------- */

  function handleCommentFormTextAreaValueChange(
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) {
    formDispatch({
      textAreaValue: e.target.value,
      type: "change_text_area_value",
    });
  }

  function handleCommentFormCancelClick() {
    formDispatchWithConfirmation({ type: "close" });
  }

  /* ------------------------ Handlers - Dialog Clicks ------------------------ */

  function handleDialogCancelClick() {
    dialogDispatch({ type: "close" });
  }

  function handleDialogConfirmClick() {
    dialogState.onConfirm();
    dialogDispatch({ type: "close" });
  }

  /* ----------------------- Handlers - Form Submissions ---------------------- */

  function handleCreateCommentSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    console.log(`Creating comment: ${formData.get("content")}`);

    e.currentTarget.reset();
  }

  function handleCreateReplySubmit(
    e: React.FormEvent<HTMLFormElement>,
    commentId: number,
  ) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    console.log(
      `Creating reply to comment with id ${commentId}: ${formData.get("content")}`,
    );

    formDispatch({ type: "close" });
  }

  function handleEditCommentSubmit(
    e: React.FormEvent<HTMLFormElement>,
    commentId: number,
  ) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    console.log(
      `Editing comment with id ${commentId}: ${formData.get("content")}`,
    );

    formDispatch({ type: "close" });
  }

  /* --------------------------------- Markup --------------------------------- */

  return (
    <main className="mx-4 my-8 md:mx-auto md:my-16 md:w-184">
      <h1 className="sr-only">
        Frontend Mentor | Interactive comments section
      </h1>

      <Flipper className="flex flex-col gap-4 md:gap-5" flipKey={formState}>
        <AppCommentList
          comments={comments}
          formState={formState}
          onCommentDeleteClick={handleCommentDeleteClick}
          onCommentEditClick={handleCommentEditClick}
          onCommentFormCancelClick={handleCommentFormCancelClick}
          onCommentFormTextAreaValueChange={
            handleCommentFormTextAreaValueChange
          }
          onCommentReplyClick={handleCommentReplyClick}
          onCreateReplySubmit={handleCreateReplySubmit}
          onEditCommentSubmit={handleEditCommentSubmit}
        />

        <CommentForm
          buttonText="Send"
          onSubmit={handleCreateCommentSubmit}
          textAreaPlaceholder="Add a comment..."
        />
      </Flipper>

      <AppDialog
        dialogState={dialogState}
        onCancelClick={handleDialogCancelClick}
        onConfirmClick={handleDialogConfirmClick}
      />
    </main>
  );
}
