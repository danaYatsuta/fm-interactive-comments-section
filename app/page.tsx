import Comment from "@/app/components/comment";
import commentsData from "@/app/exampleData";

export default function Home() {
  const comments = commentsData.comments.map((comment) => {
    return (
      <Comment
        commentData={{
          content: comment.content,
          createdAt: comment.createdAt,
          score: comment.score,
          userImageSrc: comment.user.image.webp,
          username: comment.user.username,
        }}
        key={comment.id}
      />
    );
  });

  return (
    <main className="px-4 py-8">
      <ul className="flex flex-col gap-4">{comments}</ul>

      {/* <form></form> */}
    </main>
  );
}
