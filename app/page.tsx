import Image from "next/image";

import BaseButton from "@/app/components/base-button";
import BaseCard from "@/app/components/base-card";
import Comment from "@/app/components/comment";
import commentsData from "@/app/exampleData";

export default function Home() {
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

      <BaseCard>
        <form className="flex flex-col gap-4">
          <textarea
            aria-label="Write comment"
            className="border-grey-100 text-grey-800 placeholder-grey-500 field-sizing-content max-h-47.5 min-h-24 w-full resize-none rounded-lg border px-6 py-2.5 outline-none focus:border-purple-600"
            placeholder="Add a comment..."
          ></textarea>

          <div className="flex items-center justify-between">
            <div className="relative size-8">
              <Image
                alt=""
                fill={true}
                sizes="2rem"
                src="/avatars/image-juliusomo.webp"
              />
            </div>

            <BaseButton text="Send" type="submit" />
          </div>
        </form>
      </BaseCard>
    </main>
  );
}
