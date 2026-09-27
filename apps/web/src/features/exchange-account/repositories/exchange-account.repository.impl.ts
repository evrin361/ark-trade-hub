import type { EntityId } from "@/contracts/persistence";

import type { ExchangeAccount } from "../types/exchange-account";
import type { ExchangeAccountRepository } from "./exchange-account.repository";

import type {
  ExchangeAccountRepository as InfrastructureExchangeAccountRepository,
} from "@/infrastructure/persistence/repositories/exchange-account/exchange-account-repository";

export class ExchangeAccountRepositoryImpl
  implements ExchangeAccountRepository
{
  constructor(
    private readonly repository:
      InfrastructureExchangeAccountRepository
  ) {}

  async getAll(): Promise<ExchangeAccount[]> {
    const result =
      await this.repository.getAll();

    if (!result.success) {
      throw new Error(result.error.message);
    }

    return result.data;
  }

  async getById(
    id: EntityId
  ): Promise<ExchangeAccount | undefined> {
    const result =
      await this.repository.getById(id);

    if (!result.success) {
      throw new Error(result.error.message);
    }

    return result.data;
  }

  async create(
    exchangeAccount: ExchangeAccount
  ): Promise<ExchangeAccount> {
    const result =
      await this.repository.create(exchangeAccount);

    if (!result.success) {
      throw new Error(result.error.message);
    }

    return result.data;
  }

  async update(
    exchangeAccount: ExchangeAccount
  ): Promise<ExchangeAccount> {
    const result =
      await this.repository.update(exchangeAccount);

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