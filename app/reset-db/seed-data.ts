import type { CommentRaw, UserRaw } from "@/app/types";

export const users: UserRaw[] = [
  {
    avatar: "/avatars/image-amyrobson.webp",
    created_at: "2025-10-15T18:00",
    id: 1,
    name: "amyrobson",
    updated_at: "2025-10-15T18:00",
  },
  {
    avatar: "/avatars/image-maxblagun.webp",
    created_at: "2025-10-15T18:00",
    id: 2,
    name: "maxblagun",
    updated_at: "2025-10-15T18:00",
  },
  {
    avatar: "/avatars/image-ramsesmiron.webp",
    created_at: "2025-10-15T18:00",
    id: 3,
    name: "ramsesmiron",
    updated_at: "2025-10-15T18:00",
  },
  {
    avatar: "/avatars/image-juliusomo.webp",
    created_at: "2025-10-15T18:00",
    id: 4,
    name: "juliusomo",
    updated_at: "2025-10-15T18:00",
  },
];

export const comments: CommentRaw[] = [
  {
    content:
      "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
    created_at: "2025-10-15T18:00",
    id: 1,
    is_reply: false,
    score: 12000,
    updated_at: "2025-10-15T18:00",
    user_id: 1,
  },
  {
    content:
      "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
    created_at: "2025-11-01T20:00",
    id: 2,
    is_reply: false,
    score: 5000,
    updated_at: "2025-11-01T20:00",
    user_id: 2,
  },
  {
    content:
      "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",

    created_at: "2025-11-01T20:00",
    id: 3,
    is_reply: true,
    parent_comment_id: 2,
    replying_to_comment_id: 2,
    score: 400,
    updated_at: "2025-11-07T14:00",
    user_id: 3,
  },
  {
    content:
      "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",

    created_at: "2025-11-01T20:00",
    id: 4,
    is_reply: true,
    parent_comment_id: 2,
    replying_to_comment_id: 3,
    score: 200,
    updated_at: "2025-11-13T15:00",
    user_id: 4,
  },
];
