import {
  colors,
  radius,
  spacing,
  transitions,
  typography,
} from "..";

export const buttonRecipe = {
  primary: `
  ${radius.md}
  ${spacing.md}
  ${typography.base}
  ${transitions.normal}
relative
overflow-hidden

inline-flex
items-center
justify-center
gap-2


  px-5
  py-2.5

  backdrop-blur-md

  bg-white/[0.03]
backdrop-blur-xl

bg-gradient-to-b
from-white/10
to-white/[0.03]

  text-[var(--primary)]

  border
  border-white/10

shadow-[0_8px_32px_rgba(0,0,0,0.25)]

border-t-white/20
border-l-white/15

shadow-[0_12px_40px_rgba(0,0,0,0.25)]

shadow-white/5

ring-1
ring-white/5

hover:ring-cyan-300/20

before:absolute
before:inset-x-0 before:top-0 before:h-px
before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent

  hover:bg-white/10

  hover:border-[var(--primary)]

  hover:shadow-[0_12px_45px_rgba(0,212,255,0.18)]

  active:scale-95

  cursor-pointer

  select-none
`,

  secondary: `
    ${radius.md}
    ${spacing.md}
    ${typography.base}
    ${transitions.normal}

    bg-transparent

text-[var(--text-primary)]

border
border-[var(--border)]

hover:bg-[var(--surface-2)]

    active:scale-[0.98]

    cursor-pointer
    select-none
  `,

  danger: `
    ${radius.md}
    ${spacing.md}
    ${typography.base}
    ${transitions.normal}

    bg-[var(--danger)]

text-[var(--text-primary)]

hover:opacity-90

    active:scale-[0.98]

    cursor-pointer
    select-none
  `,
} as const;