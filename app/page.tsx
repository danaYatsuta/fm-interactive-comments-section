"use client";

import { useReducer } from "react";

import AppCommentList from "@/app/components/app-comment-list";
import BaseDialog from "@/app/components/base-dialog";
import CommentForm from "@/app/components/comment-form";
import exampleData from "@/app/exampleData";
import dialogReducer from "@/app/lib/reducers/dialogReducer";
import formReducer from "@/app/lib/reducers/formReducer";

export default function App() {
  /* ---------------------------------- State --------------------------------- */

  // Mock data; will be fetched from server later
  const commentsData = exampleData.comments;

  // Info about open edit or reply form; only one edit or reply form can be shown at once
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

  /* -------------------------------- Handlers -------------------------------- */

  // Don't ask for cancel confirmation if edit is the same as original comment or if reply is empty
  function shouldAskForConfirmation(): boolean {
    switch (formState.type) {
      case "edit": {
        const editedCommentData = commentsData.find(
          (commentData) => commentData.id === formState.commentId,
        );

        return (
          editedCommentData !== undefined &&
          formState.textAreaValue !== editedCommentData.content
        );
      }
      case null: {
        return false;
      }
      case "reply": {
        return formState.textAreaValue !== "";
      }
    }
  }

  function handleCommentDeleteClick(commentId: number) {
    dialogDispatch({
      onConfirm: () => {
        console.log(`Deleting comment with id ${commentId}`);
      },
      type: "open_comment_delete_confirmation",
    });
  }

  function handleCommentEditClick(commentId: number) {
    function openEditForm() {
      const editedCommentData = commentsData.find(
        (commentData) => commentData.id === commentId,
      );

      if (editedCommentData === undefined) return;

      formDispatch({
        commentContent: editedCommentData.content,
        commentId,
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

  function handleCommentReplyClick(commentId: number) {
    function openReplyForm() {
      formDispatch({ commentId, type: "open_reply" });
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

  function handleCommentCancelEditOrReplyClick() {
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

  function handleFormTextAreaValueChange(
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) {
    formDispatch({
      textAreaValue: e.target.value.trim(),
      type: "change_text_area_value",
    });
  }

  function handleDialogCancelClick() {
    dialogDispatch({ type: "close" });
  }

  function handleDialogConfirmClick() {
    dialogState.onConfirm();
    dialogDispatch({ type: "close" });
  }

  /* --------------------------------- Markup --------------------------------- */

  return (
    <main className="mx-4 my-8 flex flex-col gap-4 md:mx-auto md:my-16 md:w-184 md:gap-5">
      <h1 className="sr-only">
        Frontend Mentor | Interactive comments section
      </h1>

      <AppCommentList
        commentsData={exampleData.comments}
        formState={formState}
        onCommentCancelEditOrReplyClick={handleCommentCancelEditOrReplyClick}
        onCommentDeleteClick={handleCommentDeleteClick}
        onCommentEditClick={handleCommentEditClick}
        onCommentReplyClick={handleCommentReplyClick}
        onFormTextAreaValueChange={handleFormTextAreaValueChange}
      />

      <BaseDialog
        dialogState={dialogState}
        onCancelClick={handleDialogCancelClick}
        onConfirmClick={handleDialogConfirmClick}
      />

      <CommentForm buttonText="Send" textAreaPlaceholder="Add a comment..." />
    </main>
  );
}
