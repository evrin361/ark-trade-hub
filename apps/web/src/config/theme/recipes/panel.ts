import { PanelVariant } from "@/components/ui/Panel/Panel.types";

export function panelRecipe(
  variant: PanelVariant = "default"
): string {

  const base = `
    flex
    flex-col
    gap-6

    rounded-2xl

    border
    border-[var(--border)]

    p-6

    transition-all
    duration-200
  `;

  const variants: Record<PanelVariant, string> = {

    default: `
      bg-[var(--surface)]
    `,

    elevated: `
      bg-[var(--surface)]
      shadow-xl
    `,

    flat: `
      bg-transparent
      border-0
      shadow-none
      p-0
    `,
  };

  return `${base} ${variants[variant]}`;
}