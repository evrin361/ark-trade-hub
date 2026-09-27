import type { EntityId } from "@/contracts/persistence";

import type { Exchange } from "../types/exchange";
import type { ExchangeRepository } from "./exchange.repository";

import type {
  ExchangeRepository as InfrastructureExchangeRepository,
} from "@/infrastructure/persistence/repositories/exchange/exchange-repository";

export class ExchangeRepositoryImpl
  implements ExchangeRepository
{
  constructor(
    private readonly repository:
      InfrastructureExchangeRepository
  ) {}

  async getAll(): Promise<Exchange[]> {
    const result =
      await this.repository.getAll();

    if (!result.success) {
      throw new Error(result.error.message);
    }

    return result.data;
  }

  async getById(
    id: EntityId
  ): Promise<Exchange | undefined> {
    const result =
      await this.repository.getById(id);

    if (!result.success) {
      throw new Error(result.error.message);
    }

    return result.data;
  }

  async create(
    exchange: Exchange
  ): Promise<Exchange> {
    const result =
      await this.repository.create(exchange);

    if (!result.success) {
      throw new Error(result.error.message);
    }

    return result.data;
  }

  async update(
    exchange: Exchange
  ): Promise<Exchange> {
    const result =
      await this.repository.update(exchange);

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
