import { forwardRef } from "react";

import type { InputProps } from "./Input.types";
import { inputRecipe } from "@/config/theme/recipes/input";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`
  ${inputRecipe()}
  ${className}
`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";