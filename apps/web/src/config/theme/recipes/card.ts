import { CardVariant } from "@/components/ui/Card/Card.types";

export function cardRecipe(
  variant: CardVariant = "default"
): string {
  const base = `
    rounded-lg
    transition-all
    duration-200
    border
  `;

  const variants: Record<CardVariant, string> = {
    default: `
      bg-slate-900
      border-slate-700
      text-white
    `,

    elevated: `
      bg-slate-800
      border-slate-600
      shadow-lg
      text-white
    `,

    flat: `
      bg-transparent
      border-transparent
      text-white
    `,
  };

  return `${base} ${variants[variant]}`;
}