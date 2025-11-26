"use client";

import { useReducer } from "react";

import AppDialog from "@/app/components/app-dialog";
import Comment from "@/app/components/comment";
import CommentForm from "@/app/components/comment-form";
import commentsData from "@/app/exampleData";
import dialogReducer from "@/app/reducers/dialogReducer";
import formReducer from "@/app/reducers/formReducer";

export default function Home() {
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
  });

  /* -------------------------------- Handlers -------------------------------- */

  function handleCommentCancelEditOrReplyClick() {
    formDispatch({ type: "close" });
  }

  function handleCommentDeleteClick() {
    dialogDispatch({ type: "open_comment_delete_confirmation" });
  }

  function handleEditClick(id: number) {
    if (formState.type === null) {
      formDispatch({
        commentContent: commentsData.comments[id].content,
        commentId: id,
        type: "open_edit",
      });
      return;
    }

    dialogDispatch({
      formType: formState.type,
      type: "open_discard_confirmation",
    });
  }

  function handleCommentReplyClick(id: number) {
    if (formState.type === null) {
      formDispatch({ commentId: id, type: "open_reply" });
      return;
    }

    dialogDispatch({
      formType: formState.type,
      type: "open_discard_confirmation",
    });
  }

  function handleDialogCancelClick() {
    dialogDispatch({ type: "close" });
  }

  function handleDialogConfirmClick() {
    dialogDispatch({ type: "close" });
  }

  /* --------------------------------- Markup --------------------------------- */

  const comments = commentsData.comments.map((comment) => {
    const replies = comment.replies?.map((reply) => {
      return (
        <li key={reply.id}>
          <Comment
            commentData={reply}
            formState={formState}
            onCancelEditOrReplyClick={handleCommentCancelEditOrReplyClick}
            onDeleteClick={handleCommentDeleteClick}
            onEditClick={() => handleEditClick(reply.id)}
            onReplyClick={() => handleCommentReplyClick(reply.id)}
          />
        </li>
      );
    });

    return (
      <li key={comment.id}>
        <Comment
          commentData={comment}
          formState={formState}
          onCancelEditOrReplyClick={handleCommentCancelEditOrReplyClick}
          onDeleteClick={handleCommentDeleteClick}
          onEditClick={() => handleEditClick(comment.id)}
          onReplyClick={() => handleCommentReplyClick(comment.id)}
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

      <AppDialog
        dialogState={dialogState}
        onCancelClick={handleDialogCancelClick}
        onConfirmClick={handleDialogConfirmClick}
      />
    </main>
  );
}
