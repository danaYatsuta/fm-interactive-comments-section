import Image from "next/image";

import BaseButton from "@/app/components/base-button";
import BaseCard from "@/app/components/base-card";

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
        <textarea
          aria-label="Comment content"
          className="border-grey-100 text-grey-800 placeholder-grey-500 field-sizing-content max-h-47.5 min-h-24 w-full resize-none rounded-lg border px-6 py-2.5 outline-none focus:border-purple-600"
          placeholder={textAreaPlaceholder}
        ></textarea>

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
