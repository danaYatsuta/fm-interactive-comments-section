import Image from "next/image";

import BaseButton from "@/app/components/base-button";
import BaseCard from "@/app/components/base-card";
import BaseTextArea from "@/app/components/base-text-area";

export default function CommentForm({
  buttonText,
  onCancelClick,
  showCancelButton = false,
  textAreaPlaceholder,
}: {
  buttonText: string;
  onCancelClick?: () => void;
  showCancelButton?: boolean;
  textAreaPlaceholder?: string;
}) {
  return (
    <BaseCard>
      <form className="flex flex-col gap-4">
        <BaseTextArea placeholder={textAreaPlaceholder} />

        <div className="flex items-center justify-between">
          <div className="relative size-8">
            <Image
              alt=""
              fill={true}
              sizes="2rem"
              src="/avatars/image-juliusomo.webp"
            />
          </div>

          <div className="flex gap-3">
            {showCancelButton && (
              <BaseButton
                color="pink"
                onClick={onCancelClick}
                text="Cancel"
                type="button"
              />
            )}

            <BaseButton text={buttonText} type="submit" />
          </div>
        </div>
      </form>
    </BaseCard>
  );
}
