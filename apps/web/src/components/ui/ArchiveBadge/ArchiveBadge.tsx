import type { ArchiveBadgeProps } from "./ArchiveBadge.types";

export function ArchiveBadge({
  archived,
}: ArchiveBadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",

        archived
          ? `
            bg-[var(--warning)]/15
            text-[var(--warning)]
            border
            border-[var(--warning)]/30
          `
          : `
            bg-white/5
            text-white/60
            border
            border-white/10
          `,
      ].join(" ")}
    >
      {archived ? "آرشیو شده" : "آرشیو نشده"}
    </span>
  );
}