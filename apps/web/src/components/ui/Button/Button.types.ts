import { ButtonHTMLAttributes, ReactNode } from "react";

import { ButtonVariant } from "@/lib/theme/button";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;

  variant?: ButtonVariant;
}