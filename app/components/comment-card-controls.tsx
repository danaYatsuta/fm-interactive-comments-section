import ButtonIcon from "@/app/components/button-icon";
import iconDelete from "@/public/icons/icon-delete.svg";
import iconEdit from "@/public/icons/icon-edit.svg";
import iconReply from "@/public/icons/icon-reply.svg";

export default function CommentCardControls({
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
      <div className="flex gap-4 md:gap-6">
        <ButtonIcon
          color="pink"
          icon={iconDelete}
          onClick={onDeleteClick}
          text="Delete"
        />

        <ButtonIcon icon={iconEdit} onClick={onEditClick} text="Edit" />
      </div>
    );
  }

  return <ButtonIcon icon={iconReply} onClick={onReplyClick} text="Reply" />;
}
