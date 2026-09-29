import type {
  CollectionResult,
  EntityId,
  PersistenceError,
  Result,
} from "@/contracts/persistence";

import type { Trade } from "@/features/trade/types/trade";

import type { TradeRepository } from "./trade-repository";

export class TradeRepositoryImpl
  implements TradeRepository
{
  private trades: Trade[] = [];

  async getAll(): Promise<
    CollectionResult<
      Trade,
      PersistenceError
    >
  > {
    return {
      success: true,
      data: [...this.trades],
    };
  }

  async getById(
    id: EntityId
  ): Promise<
    Result<
      Trade | undefined,
      PersistenceError
    >
  > {
    return {
      success: true,
      data: this.trades.find(
        (trade) =>
          trade.id.value === id.value
      ),
    };
  }

  async create(
    trade: Trade
  ): Promise<
    Result<
      Trade,
      PersistenceError
    >
  > {
    this.trades.push(trade);

    return {
      success: true,
      data: trade,
    };
  }

  async update(
    trade: Trade
  ): Promise<
    Result<
      Trade,
      PersistenceError
    >
  > {
    const index =
      this.trades.findIndex(
        (current) =>
          current.id.value ===
          trade.id.value
      );

    if (index >= 0) {
      this.trades[index] = trade;
    }

    return {
      success: true,
      data: trade,
    };
  }

  async delete(
    id: EntityId
  ): Promise<
    Result<
      void,
      PersistenceError
    >
  > {
    this.trades =
      this.trades.filter(
        (trade) =>
          trade.id.value !== id.value
      );

    return {
      success: true,
      data: undefined,
    };
  }
}
