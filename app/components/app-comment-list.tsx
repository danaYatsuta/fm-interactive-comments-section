"use client";

import { useReducer } from "react";

import BaseDialog from "@/app/components/base-dialog";
import Comment from "@/app/components/comment";
import dialogReducer from "@/app/lib/reducers/dialogReducer";
import formReducer from "@/app/lib/reducers/formReducer";
import { CommentData } from "@/app/types";

export default function AppCommentList({
  commentsData,
}: Readonly<{
  commentsData: CommentData[];
}>) {
  /* ---------------------------------- State --------------------------------- */

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
        onConfirm: () => {
          openReplyForm();
        },
        type: "open_discard_confirmation",
      });
    } else {
      openReplyForm();
    }
  }

  function handleCommentCancelEditOrReplyClick() {
    formDispatch({ type: "close" });
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

  const topLevelCommentsData = commentsData.filter(
    (commentData) => !commentData.isReply,
  );

  const comments = topLevelCommentsData.map((topLevelCommentData) => {
    const repliesData = commentsData.filter(
      (commentData) =>
        commentData.isReply &&
        commentData.parentCommentId === topLevelCommentData.id,
    );

    const replies = repliesData.map((replyData) => {
      return (
        <li key={replyData.id}>
          <Comment
            commentData={replyData}
            formState={formState}
            onCancelEditOrReplyClick={handleCommentCancelEditOrReplyClick}
            onDeleteClick={() => handleCommentDeleteClick(replyData.id)}
            onEditClick={() => handleCommentEditClick(replyData.id)}
            onFormTextAreaValueChange={handleFormTextAreaValueChange}
            onReplyClick={() => handleCommentReplyClick(replyData.id)}
          />
        </li>
      );
    });

    return (
      <li key={topLevelCommentData.id}>
        <Comment
          commentData={topLevelCommentData}
          formState={formState}
          onCancelEditOrReplyClick={handleCommentCancelEditOrReplyClick}
          onDeleteClick={() => handleCommentDeleteClick(topLevelCommentData.id)}
          onEditClick={() => handleCommentEditClick(topLevelCommentData.id)}
          onFormTextAreaValueChange={handleFormTextAreaValueChange}
          onReplyClick={() => handleCommentReplyClick(topLevelCommentData.id)}
        />

        {replies.length !== 0 && (
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
    <>
      <ul aria-label="Comments" className="flex flex-col gap-4 md:gap-5">
        {comments}
      </ul>

      <BaseDialog
        dialogState={dialogState}
        onCancelClick={handleDialogCancelClick}
        onConfirmClick={handleDialogConfirmClick}
      />
    </>
  );
}
