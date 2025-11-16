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
    <main className="mx-4 my-8">
      <ul aria-label="Comments" className="flex flex-col gap-4">
        {comments}
      </ul>

      {/* <form></form> */}
    </main>
  );
}
