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
      className="text-grey-500 fixed right-4 left-4 my-auto w-auto max-w-none translate-y-4 flex-col gap-3.5 rounded-lg px-7 py-6 opacity-0 transition transition-discrete duration-500 backdrop:bg-transparent backdrop:transition backdrop:transition-discrete backdrop:duration-500 open:flex open:translate-y-0 open:opacity-100 open:backdrop:bg-black/50 motion-reduce:transition-none motion-reduce:backdrop:transition-none md:mx-auto md:w-100 md:gap-5 md:rounded-xl md:p-8 starting:open:translate-y-4 starting:open:opacity-0 starting:open:backdrop:bg-transparent"
      ref={ref}
    >
      <h3 className="text-grey-800 text-xl font-medium md:text-2xl">
        Delete comment
      </h3>

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
