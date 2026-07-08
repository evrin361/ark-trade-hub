import type { ReactNode } from "react";

export interface FormFieldProps {
  label: string;
  required?: boolean;
  children: ReactNode;
}