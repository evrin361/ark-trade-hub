import type { StatusBadgeProps } from "./StatusBadge.types";


export function StatusBadge({
  active,
}: StatusBadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",

        active
  ? `
      bg-[var(--success)]/15
      text-[var(--success)]
      border
      border-[var(--success)]/30
    `
  : `
      bg-[var(--danger)]/15
      text-[var(--danger)]
      border
      border-[var(--danger)]/30
    `,
      ].join(" ")}
    >
      {active ? "فعال" : "غیرفعال"}
    </span>
  );
}