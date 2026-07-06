import { providerSeed } from "../../seed";
import type { Provider } from "../types/provider";

export const ProviderService = {
  getAll(): Provider[] {
    return [...providerSeed].sort((a, b) => a.order - b.order);
  },

  getEnabled(): Provider[] {
    return this.getAll().filter((provider) => provider.enabled);
  },

  getByMarket(marketId: string): Provider[] {
    return this.getEnabled().filter(
      (provider) => provider.marketId === marketId
    );
  },
};