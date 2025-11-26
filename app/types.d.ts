export type Comment =
  | (CommentBase & { isReply: false })
  | (CommentBase & {
      isReply: true;
      parentCommentId: number;
      replyingToId: number;
      replyingToUsername: string;
    });

interface CommentBase {
  content: string;
  createdAt: string;
  id: number;
  score: number;
  userAvatar: string;
  username: string;
}
