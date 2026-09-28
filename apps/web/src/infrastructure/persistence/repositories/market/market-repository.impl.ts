import type {
  CollectionResult,
  EntityId,
  PersistenceError,
  Result,
} from "@/contracts/persistence";

import type { Market } from "@/features/market/types/market";

import type { MarketRepository } from "./market-repository";

export class MarketRepositoryImpl
  implements MarketRepository
{
  private markets: Market[] = [];

  async getAll(): Promise<
    CollectionResult<
      Market,
      PersistenceError
    >
  > {
    return {
      success: true,
      data: [...this.markets],
    };
  }

  async getById(
    id: EntityId
  ): Promise<
    Result<
      Market | undefined,
      PersistenceError
    >
  > {
    return {
      success: true,
      data: this.markets.find(
        (market) =>
          market.id.value === id.value
      ),
    };
  }

  async create(
    market: Market
  ): Promise<
    Result<
      Market,
      PersistenceError
    >
  > {
    this.markets.push(market);

    return {
      success: true,
      data: market,
    };
  }

  async update(
    market: Market
  ): Promise<
    Result<
      Market,
      PersistenceError
    >
  > {
    const index =
      this.markets.findIndex(
        (current) =>
          current.id.value === market.id.value
      );

    if (index >= 0) {
      this.markets[index] = market;
    }

    return {
      success: true,
      data: market,
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
    this.markets =
      this.markets.filter(
        (market) =>
          market.id.value !== id.value
      );

    return {
      success: true,
      data: undefined,
    };
  }
}
