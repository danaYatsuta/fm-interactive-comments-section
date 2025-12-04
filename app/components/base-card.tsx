import { useId } from "react";
import { Flipped } from "react-flip-toolkit";

export default function BaseCard({
  children,
  // isFlipped prop provided for a special case for reply form in CommentCard
  // if the reply form is flipped, then on entry it slides in diagonally, which is undesired
  isFlipped = true,
}: Readonly<{ children: React.ReactNode; isFlipped?: boolean }>) {
  const flipId = useId();

  const content = (
    <div className="text-grey-500 rounded-lg bg-white p-4 shadow-md md:rounded-xl md:p-6">
      {children}
    </div>
  );

  if (isFlipped) {
    return (
      <Flipped flipId={flipId} translate>
        {content}
      </Flipped>
    );
  }

  return content;
}
