import { forwardRef } from "react";

import type { InputProps } from "./Input.types";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={[
          "w-full",
          "rounded-lg",
          "border",
          "border-gray-300",
          "bg-white",
          "px-3",
          "py-2",
          "text-sm",
          "outline-none",
          "transition",

          "focus:border-blue-500",
          "focus:ring-2",
          "focus:ring-blue-100",

          "disabled:cursor-not-allowed",
          "disabled:opacity-50",

          className,
        ].join(" ")}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";