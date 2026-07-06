import type { PanelProps } from "./Panel.types";

export function Panel({
  children,
  className = "",
}: PanelProps) {
  return (
    <section
      className={[
        "rounded-2xl",
        "border",
        "bg-white",
        "p-6",
        "shadow-sm",
        className,
      ].join(" ")}
    >
      {children}
    </section>
  );
}