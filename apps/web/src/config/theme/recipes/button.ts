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

    bg-slate-900
    text-white
    border
    border-white/10

    hover:bg-slate-800

    active:scale-[0.98]

    cursor-pointer
    select-none
  `,

  secondary: `
    ${radius.md}
    ${spacing.md}
    ${typography.base}
    ${transitions.normal}

    bg-transparent
    text-white
    border
    border-white/20

    hover:bg-white/5

    active:scale-[0.98]

    cursor-pointer
    select-none
  `,

  danger: `
    ${radius.md}
    ${spacing.md}
    ${typography.base}
    ${transitions.normal}

    bg-red-600
    text-white

    hover:bg-red-500

    active:scale-[0.98]

    cursor-pointer
    select-none
  `,
} as const;