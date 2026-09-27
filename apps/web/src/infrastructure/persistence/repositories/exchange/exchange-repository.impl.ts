import type {
  CollectionResult,
  EntityId,
  PersistenceError,
  Result,
} from "@/contracts/persistence";

import type { Exchange } from "@/features/exchange/types/exchange";

import type { ExchangeRepository } from "./exchange-repository";

export class ExchangeRepositoryImpl
  implements ExchangeRepository
{
  private exchanges: Exchange[] = [];

  async getAll(): Promise<
    CollectionResult<
      Exchange,
      PersistenceError
    >
  > {
    return {
      success: true,
      data: [...this.exchanges],
    };
  }

  async getById(
    id: EntityId
  ): Promise<
    Result<
      Exchange | undefined,
      PersistenceError
    >
  > {
    return {
      success: true,
      data: this.exchanges.find(
        (exchange) =>
          exchange.id.value === id.value
      ),
    };
  }

  async create(
    exchange: Exchange
  ): Promise<
    Result<
      Exchange,
      PersistenceError
    >
  > {
    this.exchanges.push(exchange);

    return {
      success: true,
      data: exchange,
    };
  }

  async update(
    exchange: Exchange
  ): Promise<
    Result<
      Exchange,
      PersistenceError
    >
  > {
    const index =
      this.exchanges.findIndex(
        (current) =>
          current.id.value === exchange.id.value
      );

    if (index >= 0) {
      this.exchanges[index] = exchange;
    }

    return {
      success: true,
      data: exchange,
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
    this.exchanges =
      this.exchanges.filter(
        (exchange) =>
          exchange.id.value !== id.value
      );

    return {
      success: true,
      data: undefined,
    };
  }
}
