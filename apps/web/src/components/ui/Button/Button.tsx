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
      className={`${classes} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}