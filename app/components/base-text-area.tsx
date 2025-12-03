export default function BaseTextArea({
  onChange,
  placeholder,
  value,
}: Readonly<{
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  value?: string;
}>) {
  return (
    <textarea
      aria-label="Comment content"
      className="border-grey-100 text-grey-800 placeholder-grey-500 block field-sizing-content max-h-47.5 min-h-29.5 w-full resize-none rounded-lg border px-6 py-2.5 -outline-offset-1"
      name="content"
      onChange={onChange}
      placeholder={placeholder}
      value={value}
    ></textarea>
  );
}
