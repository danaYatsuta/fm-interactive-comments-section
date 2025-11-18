import { Formatter } from "react-timeago";
import defaultFormatter from "react-timeago/defaultFormatter";

// For some reason, just using nextFormatter without any arguments causes an error: https://github.com/nmn/react-timeago/issues/233

const timeAgoFormatter: Formatter = (
  value,
  unit,
  suffix,
  epochMilliseconds,
  nextFormatter,
  now,
) => {
  if (unit === "second") return "just now";
  return defaultFormatter(
    value,
    unit,
    suffix,
    epochMilliseconds,
    nextFormatter,
    now,
  );
};

export default timeAgoFormatter;
