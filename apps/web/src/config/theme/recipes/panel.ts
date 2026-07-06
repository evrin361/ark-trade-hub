import { PanelVariant } from "@/components/ui/Panel/Panel.types";

export function panelRecipe(
  variant: PanelVariant = "default"
): string {
  const base = `
    flex
    flex-col
    gap-6
  `;

  const variants: Record<PanelVariant, string> = {
    default: "",

    elevated: "",

    flat: "",
  };

  return `${base} ${variants[variant]}`;
}