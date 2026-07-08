import { getButtonClasses } from "@/lib/theme/button";

import { ButtonProps } from "./Button.types";

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const classes = getButtonClasses(variant);

  return (
<button
  className={`
    ${classes}
    ${className}

   relative
overflow-hidden
group
  `}
  {...props}
>
  <span
  className="
    absolute
    inset-0

    bg-gradient-to-b
    from-white/15
    via-white/5
    to-transparent

    opacity-50

    transition-opacity
    duration-300

    group-hover:opacity-80
  "
/>

<span
  className="
    pointer-events-none

    absolute
    inset-0

    rounded-[inherit]

    bg-gradient-to-br
    from-white/20
    via-transparent
    to-transparent

    opacity-40
  "
/>



  <span
    className="
      relative
      z-10

      inline-flex
      items-center
      gap-2
    "
  >
    {children}
  </span>
</button>
  );
}