import Image from "next/image";

import BaseCard from "@/app/components/base-card";
import BaseTextArea from "@/app/components/base-text-area";
import ButtonFilled from "@/app/components/button-filled";

export default function CommentForm({
  buttonText,
  isFlipped = true,
  onCancelClick,
  onSubmit,
  onTextAreaChange,
  showCancelButton = false,
  textAreaPlaceholder,
  textAreaValue,
}: Readonly<{
  buttonText: string;
  isFlipped?: boolean;
  onCancelClick?: () => void;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onTextAreaChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  showCancelButton?: boolean;
  textAreaPlaceholder?: string;
  textAreaValue?: string;
}>) {
  /* --------------------------------- Markup --------------------------------- */

  return (
    <BaseCard isFlipped={isFlipped}>
      <form className="grid gap-4 md:flex" onSubmit={onSubmit}>
        <div className="col-span-2 grow">
          <BaseTextArea
            onChange={onTextAreaChange}
            placeholder={textAreaPlaceholder}
            value={textAreaValue}
          />
        </div>

        <div className="relative size-8 self-center md:-order-1 md:size-10 md:self-start">
          <Image
            alt=""
            fill={true}
            sizes="(min-width: 48rem) 2.5rem, 2rem"
            src="/avatars/image-juliusomo.webp"
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
