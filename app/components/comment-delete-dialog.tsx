import BaseButton from "@/app/components/base-button";
import { tw } from "@/app/lib/utils";

export default function CommentDeleteDialog({
  onCancelClick,
  onConfirmClick,
  ref,
}: Readonly<{
  onCancelClick: () => void;
  onConfirmClick: () => void;
  ref: React.RefObject<HTMLDialogElement | null>;
}>) {
  // Classes related to animation in a separate variable for better readability
  const dialogAnimationClasses = tw`translate-y-4 opacity-0 transition transition-discrete duration-500 open:translate-y-0 open:opacity-100 motion-reduce:transition-none starting:open:translate-y-4 starting:open:opacity-0`;

  const backdropAnimationClasses = tw`backdrop:bg-transparent backdrop:transition backdrop:transition-discrete backdrop:duration-500 motion-reduce:backdrop:transition-none starting:open:backdrop:bg-transparent`;

  return (
    <dialog
      className={`${dialogAnimationClasses} ${backdropAnimationClasses} text-grey-500 m-auto max-w-none bg-transparent px-4 open:backdrop:bg-black/50`}
      ref={ref}
    >
      <div className="flex max-w-100 flex-col gap-3.5 rounded-lg bg-white px-7 py-6 md:gap-5 md:rounded-xl md:p-8">
        <h3 className="text-grey-800 xs:text-xl text-lg font-medium md:text-2xl">
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
      </div>
    </dialog>
  );
}
