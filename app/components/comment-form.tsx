import Image from "next/image";

import BaseButton from "@/app/components/base-button";
import BaseCard from "@/app/components/base-card";
import BaseTextArea from "@/app/components/base-text-area";

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
  const buttons = (
    <>
      {showCancelButton && (
        <BaseButton
          color="pink"
          onClick={onCancelClick}
          text="Cancel"
          type="button"
        />
      )}

      <BaseButton text={buttonText} type="submit" />
    </>
  );

  return (
    <BaseCard>
      <form className="flex flex-col gap-4 md:flex-row">
        <div className="relative hidden size-10 shrink-0 md:block">
          <Image
            alt=""
            fill={true}
            sizes="2.5rem"
            src="/avatars/image-juliusomo.webp"
          />
        </div>

        <BaseTextArea placeholder={textAreaPlaceholder} />

        <div className="flex items-center justify-between md:hidden">
          <div className="relative size-8">
            <Image
              alt=""
              fill={true}
              sizes="2rem"
              src="/avatars/image-juliusomo.webp"
            />
          </div>

          <div className="flex gap-2">{buttons}</div>
        </div>

        <div className="hidden flex-col-reverse justify-end gap-2 md:flex">
          {buttons}
        </div>
      </form>
    </BaseCard>
  );
}
