import Image from "next/image";

import ButtonFilled from "@/app/components/button-filled";
import BaseCard from "@/app/components/base-card";
import BaseTextArea from "@/app/components/base-text-area";
import commentsData from "@/app/exampleData";

export default function CommentForm({
  buttonText,
  onCancelClick,
  showCancelButton = false,
  textAreaPlaceholder,
}: Readonly<{
  buttonText: string;
  onCancelClick?: () => void;
  showCancelButton?: boolean;
  textAreaPlaceholder?: string;
}>) {
  /* --------------------------------- Markup --------------------------------- */

  return (
    <BaseCard>
      <form className="grid gap-4 md:flex">
        <div className="col-span-2 grow">
          <BaseTextArea placeholder={textAreaPlaceholder} />
        </div>

        <div className="relative size-8 self-center md:-order-1 md:size-10 md:self-start">
          <Image
            alt=""
            fill={true}
            sizes="(min-width: 48rem) 2.5rem, 2rem"
            src={commentsData.currentUser.userAvatar}
          />
        </div>

        <div className="flex justify-end gap-2 md:flex-col-reverse">
          {showCancelButton && (
            <ButtonFilled
              color="pink"
              onClick={onCancelClick}
              text="Cancel"
              type="button"
            />
          )}

          <ButtonFilled text={buttonText} type="submit" />
        </div>
      </form>
    </BaseCard>
  );
}
