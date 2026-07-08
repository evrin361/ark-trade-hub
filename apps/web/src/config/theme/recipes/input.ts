export function inputRecipe() {
  return `
    w-full

    rounded-lg

    border
    border-[var(--border)]

    bg-[var(--surface)]

    px-3
    py-2

    text-sm
    text-[var(--text-primary)]

    placeholder:text-[var(--text-secondary)]

    outline-none

    transition-all
    duration-200

    focus:border-[var(--primary)]
    focus:ring-2
    focus:ring-[var(--primary)]

    disabled:cursor-not-allowed
    disabled:opacity-50
  `;
}