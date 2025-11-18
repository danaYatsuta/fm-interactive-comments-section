import IconMinus from "@/app/components/icon-minus";
import IconPlus from "@/app/components/icon-plus";

export default function CommentVoteButtons({
  score,
}: Readonly<{ score: number }>) {
  return (
    <div className="bg-grey-50 flex h-10 w-25 rounded-xl font-bold md:h-25 md:w-10 md:flex-col">
      <button
        aria-label="Upvote"
        className="size-10 rounded-xl -outline-offset-2 outline-purple-600 hover:text-purple-600"
        type="button"
      >
        <IconPlus />
      </button>

      <p className="xs:text-base grow self-center text-center text-sm font-medium text-purple-600">
        <span className="sr-only">Score: </span>
        {score}
      </p>

      <button
        aria-label="Downvote"
        className="size-10 rounded-xl -outline-offset-2 outline-purple-600 hover:text-purple-600"
        type="button"
      >
        <IconMinus />
      </button>
    </div>
  );
}
