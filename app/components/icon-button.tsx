import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

const colors = {
  pink: "text-pink-400",
  purple: "text-purple-600",
};

type Color = keyof typeof colors;

export default function IconButton({
  color = "purple",
  icon,
  text,
}: Readonly<{ color?: Color; icon: StaticImport; text: string }>) {
  return (
    <button
      className={`${colors[color]} flex items-center gap-2 rounded-sm font-medium hover:opacity-50`}
      type="button"
    >
      <Image alt="" src={icon} />
      {text}
    </button>
  );
}
