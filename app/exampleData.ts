import type { Comment } from "@/app/types";

const exampleData: {
  comments: Comment[];
  currentUser: Pick<Comment, "userAvatar" | "username">;
} = {
  comments: [
    {
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      createdAt: "2025-10-15T18:00",
      id: 1,
      isReply: false,
      score: 12000,
      userAvatar: "/avatars/image-amyrobson.webp",
      username: "amyrobson",
    },
    {
      content:
        "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      createdAt: "2025-11-01T20:00",
      id: 2,
      isReply: false,
      score: 5000,
      userAvatar: "/avatars/image-maxblagun.webp",
      username: "maxblagun",
    },
    {
      content:
        "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",

      createdAt: "2025-11-07T14:00",
      id: 3,
      isReply: true,
      parentCommentId: 2,
      replyingToId: 2,
      replyingToUsername: "maxblagun",
      score: 4,
      userAvatar: "/avatars/image-ramsesmiron.webp",
      username: "ramsesmiron",
    },
    {
      content:
        "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",

      createdAt: "2025-11-13T15:00",
      id: 4,
      isReply: true,
      parentCommentId: 2,
      replyingToId: 3,
      replyingToUsername: "ramsesmiron",
      score: 2,
      userAvatar: "/avatars/image-juliusomo.webp",
      username: "juliusomo",
    },
  ],
  currentUser: {
    userAvatar: "/avatars/image-juliusomo.webp",
    username: "juliusomo",
  },
};

export default exampleData;
