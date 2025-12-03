import { useId } from "react";
import { Flipped } from "react-flip-toolkit";

export default function BaseCard({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const flipId = useId();

  return (
    <Flipped flipId={flipId} translate>
      <div className="text-grey-500 rounded-lg bg-white p-4 shadow-md md:rounded-xl md:p-6">
        {children}
      </div>
    </Flipped>
  );
}
