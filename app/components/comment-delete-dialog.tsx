import BaseButton from "@/app/components/base-button";

export default function CommentDeleteDialog({
  onCancelClick,
  onConfirmClick,
  ref,
}: Readonly<{
  onCancelClick: () => void;
  onConfirmClick: () => void;
  ref: React.RefObject<HTMLDialogElement | null>;
}>) {
  return (
    <dialog
      className="text-grey-500 fixed right-4 left-4 my-auto w-auto max-w-none flex-col gap-3.5 rounded-lg px-7 py-6 backdrop:bg-black/50 open:flex"
      ref={ref}
    >
      <h3 className="text-grey-800 text-xl font-medium">Delete comment</h3>

      <p>
        Are you sure you want to delete this comment? This will remove the
        comment and can&apos;t be undone.
      </p>

      <div className="flex gap-3">
        <BaseButton
          color="grey"
          grow
          onClick={onCancelClick}
          text="No, cancel"
        />

        <BaseButton
          color="pink"
          grow
          onClick={onConfirmClick}
          text="Yes, delete"
        />
      </div>
    </dialog>
  );
}
