export interface Comment {
  content: string;
  createdAt: string;
  id: number;
  replies?: Comment[];
  replyingToId?: number;
  replyingToUsername?: string;
  score: number;
  userAvatar: string;
  username: string;
}
