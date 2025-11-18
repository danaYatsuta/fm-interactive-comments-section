import Image from "next/image";

import BaseButton from "@/app/components/base-button";
import BaseCard from "@/app/components/base-card";
import BaseTextArea from "@/app/components/base-text-area";

export default function CommentForm({
  buttonText,
  textAreaPlaceholder,
}: {
  buttonText: string;
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

          <BaseButton text={buttonText} type="submit" />
        </div>
      </form>
    </BaseCard>
  );
}
