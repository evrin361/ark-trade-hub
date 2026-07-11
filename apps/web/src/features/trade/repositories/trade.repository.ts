import type { Trade } from "../types/trade";

export interface TradeRepository {
  getAll(): Promise<Trade[]>;

  getById(
    id: string
  ): Promise<Trade | undefined>;

  create(
    trade: Trade
  ): Promise<Trade>;

  update(
    trade: Trade
  ): Promise<Trade>;

  delete(
    id: string
  ): Promise<void>;
}