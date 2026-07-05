import { buttonRecipe } from "@/config/theme/recipes/button";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger";

export function getButtonClasses(
  variant: ButtonVariant = "primary"
): string {
  return buttonRecipe[variant];
}