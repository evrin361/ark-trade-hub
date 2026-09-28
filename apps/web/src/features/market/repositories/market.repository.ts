import type { EntityId } from "@/contracts/persistence";
import type { Market } from "../types/market";

export interface MarketRepository {
  getAll(): Promise<Market[]>;

  getById(
    id: EntityId
  ): Promise<Market | undefined>;

  create(
    market: Market
  ): Promise<Market>;

  update(
    market: Market
  ): Promise<Market>;

  delete(
    id: EntityId
  ): Promise<void>;
}
