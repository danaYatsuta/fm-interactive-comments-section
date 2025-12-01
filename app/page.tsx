"use client";

import { useReducer } from "react";

import AppCommentList from "@/app/components/app-comment-list";
import AppDialog from "@/app/components/app-dialog";
import CommentForm from "@/app/components/comment-form";
import exampleData from "@/app/exampleData";
import { DialogContext } from "@/app/lib/contexts/DialogContext";
import { FormContext } from "@/app/lib/contexts/FormContext";
import dialogReducer from "@/app/lib/reducers/dialogReducer";
import formReducer from "@/app/lib/reducers/formReducer";

export default function App() {
  /* ---------------------------------- State --------------------------------- */

  const comments = exampleData.comments;

  // Info about open edit or reply form; only one edit or reply form can be shown at once
  const [formState, formDispatch] = useReducer(formReducer, {
    commentId: null,
    textAreaValue: "",
    type: null,
  });

  const [dialogState, dialogDispatch] = useReducer(dialogReducer, {
    confirmButtonText: "",
    heading: "",
    isOpen: false,
    message: "",
    onConfirm: () => {},
  });

  /* --------------------------------- Markup --------------------------------- */

  return (
    <main className="mx-4 my-8 flex flex-col gap-4 md:mx-auto md:my-16 md:w-184 md:gap-5">
      <h1 className="sr-only">
        Frontend Mentor | Interactive comments section
      </h1>

      <DialogContext value={[dialogState, dialogDispatch]}>
        <FormContext value={[formState, formDispatch]}>
          <AppCommentList comments={comments} />
        </FormContext>

        <AppDialog />
      </DialogContext>

      <CommentForm buttonText="Send" textAreaPlaceholder="Add a comment..." />
    </main>
  );
}
