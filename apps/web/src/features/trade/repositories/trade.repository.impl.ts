import type { EntityId } from "@/contracts/persistence";

import type { Trade } from "../types/trade";
import type { TradeRepository } from "./trade.repository";

import type {
  TradeRepository as InfrastructureTradeRepository,
} from "@/infrastructure/persistence/repositories/trade/trade-repository";

export class TradeRepositoryImpl
  implements TradeRepository
{
  constructor(
    private readonly repository:
      InfrastructureTradeRepository
  ) {}

  async getAll(): Promise<Trade[]> {
    const result =
      await this.repository.getAll();

    if (!result.success) {
      throw new Error(result.error.message);
    }

    return result.data;
  }

  async getById(
    id: EntityId
  ): Promise<Trade | undefined> {
    const result =
      await this.repository.getById(id);

    if (!result.success) {
      throw new Error(result.error.message);
    }

    return result.data;
  }

  async create(
    trade: Trade
  ): Promise<Trade> {
    const result =
      await this.repository.create(trade);

    if (!result.success) {
      throw new Error(result.error.message);
    }

    return result.data;
  }

  async update(
    trade: Trade
  ): Promise<Trade> {
    const result =
      await this.repository.update(trade);

    if (!result.success) {
      throw new Error(result.error.message);
    }

    return result.data;
  }

  async delete(
    id: EntityId
  ): Promise<void> {
    const result =
      await this.repository.delete(id);

    if (!result.success) {
      throw new Error(result.error.message);
    }
  }
}
