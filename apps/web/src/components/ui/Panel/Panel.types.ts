import type { ReactNode } from "react";

export type PanelVariant =
  | "default"
  | "flat"
  | "elevated";

export interface PanelProps {
  children: ReactNode;

  className?: string;

  variant?: PanelVariant;
}