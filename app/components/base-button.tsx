const colors = {
  grey: "bg-grey-800",
  pink: "bg-pink-400",
  purple: "bg-purple-600",
};

type Color = keyof typeof colors;

export default function BaseButton({
  color = "purple",
  text,
  type = "button",
}: Readonly<{ color?: Color; text: string; type?: "button" | "submit" }>) {
  return (
    <button
      className={`${colors[color]} h-12 rounded-lg px-8 font-bold text-white uppercase hover:opacity-50`}
      type={type}
    >
      {text}
    </button>
  );
}
