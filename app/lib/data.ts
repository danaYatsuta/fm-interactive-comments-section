"use server";

import postgres from "postgres";

import type {
  Comment,
  CommentBase,
  CommentRaw,
  User,
  UserRaw,
} from "@/app/types";

const sql = postgres(process.env.POSTGRES_URL as string, {
  ssl: process.env.NODE_ENV === "production" ? "verify-full" : false,
});

export async function fetchComments() {
  try {
    const commentsRaw = await sql<CommentRaw[]>`SELECT * FROM comments`;

    const comments: Comment[] = await Promise.all(
      commentsRaw.map(async (commentRaw) => {
        const user = await fetchUserById(commentRaw.user_id);

        const commentBase: CommentBase = {
          content: commentRaw.content,
          createdAt: commentRaw.created_at,
          id: commentRaw.id,
          score: commentRaw.score,
          user,
        };

        if (commentRaw.is_reply) {
          const replyingToUserName = await sql<
            {
              name: string;
            }[]
          >`SELECT name FROM comments JOIN users ON comments.user_id = users.id WHERE comments.id = ${commentRaw.replying_to_comment_id}`;

          return {
            ...commentBase,
            isReply: true,
            parentCommentId: commentRaw.parent_comment_id,
            replyingToCommentId: commentRaw.replying_to_comment_id,
            replyingToUserName: replyingToUserName[0].name,
          };
        } else {
          return {
            ...commentBase,
            isReply: false,
          };
        }
      }),
    );

    return comments;
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

async function fetchUserById(id: number) {
  const userRaw = await sql<UserRaw[]>`SELECT * FROM users WHERE id = ${id}`;

  const user: User = {
    avatar: userRaw[0].avatar,
    id: userRaw[0].id,
    name: userRaw[0].name,
  };

  return user;
}
