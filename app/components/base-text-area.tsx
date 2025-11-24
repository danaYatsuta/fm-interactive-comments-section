export default function BaseTextArea({
  defaultValue,
  placeholder,
}: Readonly<{
  defaultValue?: string;
  placeholder?: string;
}>) {
  return (
    <textarea
      aria-label="Comment content"
      className="border-grey-100 text-grey-800 placeholder-grey-500 field-sizing-content max-h-47.5 min-h-29.5 w-full resize-none rounded-lg border px-6 py-2.5 -outline-offset-1"
      defaultValue={defaultValue}
      placeholder={placeholder}
    ></textarea>
  );
}
