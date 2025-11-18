"use client";

import { useState } from "react";

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

  /* -------------------------------- Handlers -------------------------------- */

  function handleReplyClick(id: number) {
    setShownForm({ id, type: "reply" });
  }

  function handleReplyCancelClick() {
    setShownForm({ id: null, type: null });
  }

  /* --------------------------------- Markup --------------------------------- */

  const comments = commentsData.comments.map((comment) => {
    const replies = comment.replies.map((reply) => {
      return (
        <li key={reply.id}>
          <Comment
            commentData={{
              content: reply.content,
              createdAt: reply.createdAt,
              id: reply.id,
              replyingToId: reply.replyingToId,
              replyingToUser: reply.replyingToUser,
              score: reply.score,
              userImageSrc: reply.user.image.webp,
              username: reply.user.username,
            }}
            isReplyFormShown={reply.id === shownForm.id}
            onReplyCancelClick={handleReplyCancelClick}
            onReplyClick={() => handleReplyClick(reply.id)}
          />
        </li>
      );
    });

    return (
      <li key={comment.id}>
        <Comment
          commentData={{
            content: comment.content,
            createdAt: comment.createdAt,
            id: comment.id,
            score: comment.score,
            userImageSrc: comment.user.image.webp,
            username: comment.user.username,
          }}
          isReplyFormShown={comment.id === shownForm.id}
          onReplyCancelClick={handleReplyCancelClick}
          onReplyClick={() => handleReplyClick(comment.id)}
        />

        {replies.length !== 0 && (
          <ul
            aria-label="Replies"
            className="border-grey-100 mt-4 flex flex-col gap-4 border-l-3 pl-4"
          >
            {replies}
          </ul>
        )}
      </li>
    );
  });

  return (
    <main className="mx-4 my-8 flex flex-col gap-4">
      <h1 className="sr-only">
        Frontend Mentor | Interactive comments section
      </h1>

      <ul aria-label="Comments" className="flex flex-col gap-4">
        {comments}
      </ul>

      <CommentForm buttonText="Send" textAreaPlaceholder="Add a comment..." />
    </main>
  );
}
