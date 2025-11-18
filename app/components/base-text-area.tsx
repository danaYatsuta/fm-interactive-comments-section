export default function BaseTextArea({
  ariaLabel,
  placeholder,
}: Readonly<{ ariaLabel: string; placeholder: string }>) {
  return (
    <textarea
      aria-label={ariaLabel}
      className="border-grey-100 text-grey-800 placeholder-grey-500 field-sizing-content max-h-47.5 min-h-24 w-full resize-none rounded-lg border px-6 py-2.5 outline-none focus:border-purple-600"
      placeholder={placeholder}
    ></textarea>
  );
}
