import Image from "next/image";

import TimeAgoWrapper from "@/app/components/time-ago-wrapper";

export default function CommentCardHeader({
  canUserEdit,
  createdAt,
  userAvatar,
  username,
}: {
  canUserEdit: boolean;
  createdAt: string;
  userAvatar: string;
  username: string;
}) {
  return (
    <div className="xs:gap-4 flex items-center gap-2 text-nowrap">
      <div className="relative size-8">
        <Image alt="" fill={true} sizes="2rem" src={userAvatar} />
      </div>

      {/* aria-hidden="true" on p and TimeAgo because this text is repeated in h2 above */}

      <p
        aria-hidden="true"
        className="text-grey-800 flex items-center gap-2 font-medium"
      >
        <span className="max-w-28 truncate">{username}</span>
        {canUserEdit && (
          <span className="xs:text-sm flex h-5 items-center rounded-sm bg-purple-600 px-1.5 text-xs text-white">
            you
          </span>
        )}
      </p>

      <TimeAgoWrapper date={createdAt} />
    </div>
  );
}
