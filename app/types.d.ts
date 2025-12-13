export type Comment =
  | (CommentBase & { isReply: false })
  | (CommentBase & {
      isReply: true;
      parentCommentId: number;
      replyingToCommentId: number;
      replyingToUserName: string;
    });

export type CommentRaw =
  | (CommentRawBase & { is_reply: false })
  | (CommentRawBase & {
      is_reply: true;
      parent_comment_id: number;
      replying_to_comment_id: number;
    });

export type User = Pick<UserRaw, "avatar" | "id" | "name">;

export interface UserRaw {
  avatar: string;
  created_at: string;
  id: number;
  name: string;
  updated_at: string;
}

interface CommentBase {
  content: string;
  createdAt: string;
  id: number;
  score: number;
  user: User;
}

interface CommentRawBase {
  content: string;
  created_at: string;
  id: number;
  score: number;
  updated_at: string;
  user_id: number;
}
