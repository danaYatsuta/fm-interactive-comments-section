/**
 * Tag function that just returns the input string unchanged.
 *
 * It's used to hint to Tailwind CSS IntelliSense and prettier-plugin-tailwindcss that
 * the input string is a list of Tailwind classes to enable hinting and sorting.
 */
const tw = (strings: TemplateStringsArray, ...values: unknown[]) =>
  String.raw({ raw: strings }, ...values);

export { tw };
