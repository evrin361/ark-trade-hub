import type { EntityId } from "@/contracts/persistence";
import type { Trade } from "../types/trade";

export interface TradeRepository {
  getAll(): Promise<Trade[]>;

  getById(id: EntityId): Promise<Trade | undefined>;

  create(trade: Trade): Promise<Trade>;

  update(trade: Trade): Promise<Trade>;

  delete(id: EntityId): Promise<void>;
}
