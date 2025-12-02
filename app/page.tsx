import AppCommentList from "@/app/components/app-comment-list";
import AppDialog from "@/app/components/app-dialog";
import CommentForm from "@/app/components/comment-form";
import exampleData from "@/app/exampleData";
import { DialogProvider } from "@/app/lib/providers/dialog-provider";

export default function App() {
  /* ---------------------------------- State --------------------------------- */

  const comments = exampleData.comments;

  /* --------------------------------- Markup --------------------------------- */

  return (
    <main className="mx-4 my-8 flex flex-col gap-4 md:mx-auto md:my-16 md:w-184 md:gap-5">
      <h1 className="sr-only">
        Frontend Mentor | Interactive comments section
      </h1>

      <DialogProvider>
        <AppCommentList comments={comments} />

        <AppDialog />
      </DialogProvider>

      <CommentForm buttonText="Send" textAreaPlaceholder="Add a comment..." />
    </main>
  );
}
