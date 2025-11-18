import IconButton from "@/app/components/icon-button";
import IconMinus from "@/app/components/icon-minus";
import IconPlus from "@/app/components/icon-plus";
import iconDelete from "@/public/icons/icon-delete.svg";
import iconEdit from "@/public/icons/icon-edit.svg";
import iconReply from "@/public/icons/icon-reply.svg";

export default function CommentControls({
  canUserEdit,
  onDeleteClick,
  onEditClick,
  onReplyClick,
  score,
}: Readonly<{
  canUserEdit: boolean;
  onDeleteClick: () => void;
  onEditClick: () => void;
  onReplyClick: () => void;
  score: number;
}>) {
  return (
    <div className="flex items-center justify-between text-purple-200">
      <div className="bg-grey-50 flex h-10 w-25 rounded-xl font-bold">
        <button
          aria-label="Upvote"
          className="w-10 rounded-xl -outline-offset-2 outline-purple-600 hover:text-purple-600"
          type="button"
        >
          <IconPlus />
        </button>

        <p className="xs:text-base grow self-center text-center text-sm font-medium text-purple-600">
          <span className="sr-only">Score: </span>
          {score}
        </p>

        <button
          aria-label="Downvote"
          className="w-10 rounded-xl -outline-offset-2 outline-purple-600 hover:text-purple-600"
          type="button"
        >
          <IconMinus />
        </button>
      </div>

      {canUserEdit ? (
        <div className="flex gap-4">
          <IconButton
            color="pink"
            icon={iconDelete}
            onClick={onDeleteClick}
            text="Delete"
          />

          <IconButton icon={iconEdit} onClick={onEditClick} text="Edit" />
        </div>
      ) : (
        <IconButton icon={iconReply} onClick={onReplyClick} text="Reply" />
      )}
    </div>
  );
}
