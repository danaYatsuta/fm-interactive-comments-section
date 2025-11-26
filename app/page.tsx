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

  /* ------------------------------ Derived State ----------------------------- */

  const topLevelComments = commentsData.comments.filter(
    (comment) => !comment.isReply,
  );

  /* -------------------------------- Handlers -------------------------------- */

  function handleCommentCancelEditOrReplyClick() {
    formDispatch({ type: "close" });
  }

  function handleCommentDeleteClick() {
    dialogDispatch({ type: "open_comment_delete_confirmation" });
  }

  function handleEditClick(id: number) {
    if (formState.type === null) {
      const comment = commentsData.comments.find(
        (comment) => comment.id === id,
      );

      if (comment === undefined) return;

      formDispatch({
        commentContent: comment.content,
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

  const commentsJsx = topLevelComments.map((topLevelComment) => {
    const replies = commentsData.comments.filter(
      (comment) =>
        comment.isReply && comment.parentCommentId === topLevelComment.id,
    );

    const repliesJsx = replies.map((reply) => {
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
      <li key={topLevelComment.id}>
        <Comment
          commentData={topLevelComment}
          formState={formState}
          onCancelEditOrReplyClick={handleCommentCancelEditOrReplyClick}
          onDeleteClick={handleCommentDeleteClick}
          onEditClick={() => handleEditClick(topLevelComment.id)}
          onReplyClick={() => handleCommentReplyClick(topLevelComment.id)}
        />

        {repliesJsx.length !== 0 && (
          <ul
            aria-label="Replies"
            className="border-grey-100 mt-4 flex flex-col gap-4 border-l-3 pl-4 md:mt-5 md:ml-10 md:pl-10"
          >
            {repliesJsx}
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
        {commentsJsx}
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
