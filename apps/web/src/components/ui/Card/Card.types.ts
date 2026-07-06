import { HTMLAttributes, ReactNode } from "react";

export type CardVariant =
  | "default"
  | "elevated"
  | "flat";

export interface CardProps
  extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: CardVariant;
}