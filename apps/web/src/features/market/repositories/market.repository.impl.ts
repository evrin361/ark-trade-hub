import type { EntityId } from "@/contracts/persistence";

import type { Market } from "../types/market";
import type { MarketRepository } from "./market.repository";

import type {
  MarketRepository as InfrastructureMarketRepository,
} from "@/infrastructure/persistence/repositories/market/market-repository";

export class MarketRepositoryImpl
  implements MarketRepository
{
  constructor(
    private readonly repository:
      InfrastructureMarketRepository
  ) {}

  async getAll(): Promise<Market[]> {
    const result =
      await this.repository.getAll();

    if (!result.success) {
      throw new Error(result.error.message);
    }

    return result.data;
  }

  async getById(
    id: EntityId
  ): Promise<Market | undefined> {
    const result =
      await this.repository.getById(id);

    if (!result.success) {
      throw new Error(result.error.message);
    }

    return result.data;
  }

  async create(
    market: Market
  ): Promise<Market> {
    const result =
      await this.repository.create(market);

    if (!result.success) {
      throw new Error(result.error.message);
    }

    return result.data;
  }

  async update(
    market: Market
  ): Promise<Market> {
    const result =
      await this.repository.update(market);

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
