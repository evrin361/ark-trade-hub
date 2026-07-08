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
  bg-white/[0.04]

  backdrop-blur-xl

  border
  border-white/10

  shadow-[0_8px_30px_rgba(0,0,0,0.25)]

  text-[var(--text-primary)]

  hover:border-[var(--primary)]/30

  hover:shadow-[0_0_25px_rgba(0,212,255,0.10)]
`,

elevated: `
  bg-white/[0.06]

  backdrop-blur-xl

  border
  border-white/10

  shadow-[0_15px_45px_rgba(0,0,0,0.35)]

  text-[var(--text-primary)]

  hover:border-[var(--primary)]/40

  hover:shadow-[0_0_35px_rgba(0,212,255,0.18)]
`,

    flat: `
  bg-transparent
  border-transparent
  text-[var(--text-primary)]
`,
  };

  return `${base} ${variants[variant]}`;
}