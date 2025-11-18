import IconButton from "@/app/components/icon-button";
import iconDelete from "@/public/icons/icon-delete.svg";
import iconEdit from "@/public/icons/icon-edit.svg";
import iconReply from "@/public/icons/icon-reply.svg";

export default function CommentControls({
  canUserEdit,
  onDeleteClick,
  onEditClick,
  onReplyClick,
}: Readonly<{
  canUserEdit: boolean;
  onDeleteClick: () => void;
  onEditClick: () => void;
  onReplyClick: () => void;
}>) {
  if (canUserEdit) {
    return (
      <div className="flex gap-4">
        <IconButton
          color="pink"
          icon={iconDelete}
          onClick={onDeleteClick}
          text="Delete"
        />

        <IconButton icon={iconEdit} onClick={onEditClick} text="Edit" />
      </div>
    );
  }

  return <IconButton icon={iconReply} onClick={onReplyClick} text="Reply" />;
}
