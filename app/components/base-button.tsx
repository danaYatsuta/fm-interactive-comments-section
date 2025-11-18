const colors = {
  grey: "bg-grey-500 outline-grey-500",
  pink: "bg-pink-400 outline-pink-400",
  purple: "bg-purple-600 outline-purple-600",
};

type Color = keyof typeof colors;

export default function BaseButton({
  color = "purple",
  grow = false,
  onClick,
  text,
  type = "button",
}: Readonly<{
  color?: Color;
  grow?: boolean;
  onClick?: () => void;
  text: string;
  type?: "button" | "submit";
}>) {
  return (
    <button
      className={`${colors[color]} ${grow && "flex-1"} h-12 min-w-26 rounded-lg font-medium text-white uppercase hover:opacity-50`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
}
