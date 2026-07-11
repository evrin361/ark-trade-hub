import type { Market } from "../types/market";

export interface MarketRepository {
  getAll(): Promise<Market[]>;

  getById(
    id: string
  ): Promise<Market | undefined>;

  create(
    market: Market
  ): Promise<Market>;

  update(
    market: Market
  ): Promise<Market>;

  delete(
    id: string
  ): Promise<void>;
}