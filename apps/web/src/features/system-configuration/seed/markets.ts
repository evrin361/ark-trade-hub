import type { Market } from "../markets/types/market";

export const marketSeed: Market[] = [
  {
    id: "market-crypto",

    name: "Cryptocurrency",

    code: "crypto",

    order: 1,

    enabled: true,

    createdAt: new Date(),

    updatedAt: new Date(),
  },
];