import { marketSeed } from "../../seed";
import type { Market } from "../types/market";

export const MarketService = {
  getAll(): Market[] {
    return [...marketSeed].sort((a, b) => a.order - b.order);
  },

  getEnabled(): Market[] {
    return this.getAll().filter((market) => market.enabled);
  },

  getById(id: string): Market | undefined {
    return this.getAll().find((market) => market.id === id);
  },
};