import type { Provider } from "../providers/types/provider";

export const providerSeed: Provider[] = [
  {
    id: "provider-nobitex",

    marketId: "market-crypto",

    name: "Nobitex",

    code: "nobitex",

    order: 1,

    enabled: true,

    createdAt: new Date(),

    updatedAt: new Date(),
  },
];