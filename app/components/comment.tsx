"use client";

import { useTimeAgo } from "@shined/react-use";
import Image from "next/image";

import iconReply from "@/public/icons/icon-reply.svg";

export default function Comment({
  commentData,
}: Readonly<{
  commentData: {
    content: string;
    createdAt: string;
    score: number;
    userImageSrc: string;
    username: string;
  };
}>) {
  /* ------------------------------ Derived State ----------------------------- */

  const timeAgo = useTimeAgo(commentData.createdAt);

  const date = new Date(commentData.createdAt);
  const dateTimeFormat = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  });
  const formattedDate = dateTimeFormat.format(date);

  /* --------------------------------- Markup --------------------------------- */

  return (
    <li>
      <article
        aria-label={`Comment from ${commentData.username} left ${timeAgo}`}
        className="text-grey-500 flex flex-col gap-4 rounded-md bg-white p-4 shadow-md"
      >
        <div className="flex items-center gap-4">
          <div className="relative size-8">
            <Image
              alt=""
              fill={true}
              sizes="2rem"
              src={commentData.userImageSrc}
            />
          </div>

          <p className="text-grey-800 font-medium">{commentData.username}</p>

          <time dateTime={commentData.createdAt} title={formattedDate}>
            {timeAgo}
          </time>
        </div>

        <p>{commentData.content}</p>

        <div className="flex items-center justify-between text-purple-200">
          <div className="bg-grey-50 flex h-10 w-25 rounded-xl text-lg font-bold">
            <button
              aria-label="Upvote"
              className="w-10 rounded-xl -outline-offset-6 hover:text-purple-600"
              type="button"
            >
              +
            </button>

            <p className="grow self-center text-center text-base font-medium text-purple-600">
              {commentData.score}
            </p>

            <button
              aria-label="Downvote"
              className="w-10 rounded-xl -outline-offset-6 hover:text-purple-600"
              type="button"
            >
              −
            </button>
          </div>

          <button
            className="flex items-center gap-2 font-medium text-purple-600 hover:opacity-50"
            type="button"
          >
            <Image alt="" src={iconReply} />
            Reply
          </button>
        </div>
      </article>
    </li>
  );
}
