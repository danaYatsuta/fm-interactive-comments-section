"use client";

import Image from "next/image";
import TimeAgo, { Formatter } from "react-timeago";
import defaultFormatter from "react-timeago/defaultFormatter";

import iconReply from "@/public/icons/icon-reply.svg";

export default function Comment({
  commentData,
}: Readonly<{
  commentData: {
    content: string;
    createdAt: string;
    id: number;
    score: number;
    userImageSrc: string;
    username: string;
  };
}>) {
  /* ------------------------------ Derived State ----------------------------- */

  const date = new Date(commentData.createdAt);
  const dateTimeFormat = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  });

  const formattedDate = dateTimeFormat.format(date);

  /* --------------------------------- Markup --------------------------------- */

  return (
    // Using aria-labelledby on visually hidden element instead of aria-label because
    // there is no way to put time ago inside attribute

    <article
      aria-labelledby={`comment-${commentData.id}`}
      className="text-grey-500 flex flex-col gap-4 rounded-md bg-white p-4 shadow-md"
    >
      <h2 className="sr-only" id={`comment-${commentData.id}`}>
        Comment by {commentData.username} left{" "}
        <TimeAgo
          date={commentData.createdAt}
          formatter={timeAgoFormatter}
          title={formattedDate}
        />
      </h2>

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

        <TimeAgo
          date={commentData.createdAt}
          formatter={timeAgoFormatter}
          title={formattedDate}
        />
      </div>

      <p>{commentData.content}</p>

      <div className="flex items-center justify-between text-purple-200">
        <div className="bg-grey-50 flex h-10 w-25 rounded-xl text-lg font-bold">
          <button
            aria-label="Upvote"
            className="w-10 rounded-xl -outline-offset-2 hover:text-purple-600"
            type="button"
          >
            +
          </button>

          <p className="grow self-center text-center text-base font-medium text-purple-600">
            <span className="sr-only">Score: </span>
            {commentData.score}
          </p>

          <button
            aria-label="Downvote"
            className="w-10 rounded-xl -outline-offset-2 hover:text-purple-600"
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
  );
}

// For some reason, just using nextFormatter without any arguments causes an error: https://github.com/nmn/react-timeago/issues/233

const timeAgoFormatter: Formatter = (
  value,
  unit,
  suffix,
  epochMilliseconds,
  nextFormatter,
  now,
) => {
  if (unit === "second") return "just now";
  return defaultFormatter(
    value,
    unit,
    suffix,
    epochMilliseconds,
    nextFormatter,
    now,
  );
};
