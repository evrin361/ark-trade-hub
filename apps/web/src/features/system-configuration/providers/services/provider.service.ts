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

  getById(id: string): Provider | undefined {
    return this.getAll().find(
      (provider) => provider.id === id
    );
  },


  create(
    providers: Provider[],
    data: {
      name: string;
      code: string;
      marketId: string;
    }
  ): Provider[] {

    const now = new Date();

    const newProvider: Provider = {
      id: crypto.randomUUID(),

      marketId: data.marketId,

      name: data.name,

      code: data.code,

      order: providers.length + 1,

      enabled: true,

      createdAt: now,

      updatedAt: now,
    };

    return [...providers, newProvider];
  },

};