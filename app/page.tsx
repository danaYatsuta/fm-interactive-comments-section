import AppCommentList from "@/app/components/app-comment-list";
import CommentForm from "@/app/components/comment-form";
import exampleData from "@/app/exampleData";

export default function App() {
  /* --------------------------------- Markup --------------------------------- */

  return (
    <main className="mx-4 my-8 flex flex-col gap-4 md:mx-auto md:my-16 md:w-184 md:gap-5">
      <h1 className="sr-only">
        Frontend Mentor | Interactive comments section
      </h1>

      <AppCommentList commentsData={exampleData.comments} />

      <CommentForm buttonText="Send" textAreaPlaceholder="Add a comment..." />
    </main>
  );
}
