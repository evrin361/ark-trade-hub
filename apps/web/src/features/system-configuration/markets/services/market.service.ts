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



  update(
  markets: Market[],
  id: string,
  data: {
    name: string;
    code: string;
  }
): Market[] {
  return markets.map((market) =>
    market.id === id
      ? {
          ...market,
          name: data.name,
          code: data.code,
          updatedAt: new Date(),
        }
      : market
  );
},

create(
  markets: Market[],
  data: {
    name: string;
    code: string;
  }
): Market[] {
  const now = new Date();

  const newMarket: Market = {
    id: crypto.randomUUID(),
    name: data.name,
    code: data.code,
    order: markets.length + 1,
    enabled: true,
    createdAt: now,
    updatedAt: now,
  };

  return [...markets, newMarket];
},

};