"use client";

import { useReducer } from "react";

import AppCommentList, {
  OpenDialogFunction,
} from "@/app/components/app-comment-list";
import AppDialog from "@/app/components/app-dialog";
import CommentForm from "@/app/components/comment-form";
import exampleData from "@/app/exampleData";
import { dialogReducer } from "@/app/lib/reducers/dialog-reducer";

export default function App() {
  /* ---------------------------------- State --------------------------------- */

  const [dialogState, dialogDispatch] = useReducer(dialogReducer, {
    confirmButtonText: "",
    heading: "",
    isOpen: false,
    message: "",
    onConfirm: () => {},
  });

  const comments = exampleData.comments;

  /* -------------------------------- Handlers -------------------------------- */

  function handleCommentDeleteClick(commentId: number) {
    dialogDispatch({
      dialogType: "delete_comment",
      onConfirm: () => {
        console.log(`Deleting comment with id ${commentId}`);
      },
      type: "open",
    });
  }

  const openDialog: OpenDialogFunction = function ({
    currentFormStateType,
    onConfirm,
  }) {
    dialogDispatch({
      dialogType:
        currentFormStateType === "edit" ? "discard_edit" : "discard_reply",
      onConfirm,
      type: "open",
    });
  };

  function handleDialogCancelClick() {
    dialogDispatch({ type: "close" });
  }

  function handleDialogConfirmClick() {
    dialogState.onConfirm();
    dialogDispatch({ type: "close" });
  }

  function handleCreateCommentSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    console.log(`Creating comment: ${formData.get("content")}`);

    e.currentTarget.reset();
  }

  /* --------------------------------- Markup --------------------------------- */

  return (
    <main className="mx-4 my-8 flex flex-col gap-4 md:mx-auto md:my-16 md:w-184 md:gap-5">
      <h1 className="sr-only">
        Frontend Mentor | Interactive comments section
      </h1>

      <AppCommentList
        comments={comments}
        onCommentDeleteClick={handleCommentDeleteClick}
        openDialog={openDialog}
      />

      <AppDialog
        confirmButtonText={dialogState.confirmButtonText}
        heading={dialogState.heading}
        isOpen={dialogState.isOpen}
        message={dialogState.message}
        onCancelClick={handleDialogCancelClick}
        onConfirmClick={handleDialogConfirmClick}
      />

      <CommentForm
        buttonText="Send"
        onSubmit={handleCreateCommentSubmit}
        textAreaPlaceholder="Add a comment..."
      />
    </main>
  );
}
