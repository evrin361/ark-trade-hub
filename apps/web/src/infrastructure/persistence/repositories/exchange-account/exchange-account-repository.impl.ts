import type {
  CollectionResult,
  EntityId,
  PersistenceError,
  Result,
} from "@/contracts/persistence";

import type { ExchangeAccount } from "@/features/exchange-account/types/exchange-account";

import type { ExchangeAccountRepository } from "./exchange-account-repository";

export class ExchangeAccountRepositoryImpl
  implements ExchangeAccountRepository
{
  private exchangeAccounts: ExchangeAccount[] = [];

  async getAll(): Promise<
    CollectionResult<
      ExchangeAccount,
      PersistenceError
    >
  > {
    return {
      success: true,
      data: [...this.exchangeAccounts],
    };
  }

  async getById(
    id: EntityId
  ): Promise<
    Result<
      ExchangeAccount | undefined,
      PersistenceError
    >
  > {
    return {
      success: true,
      data: this.exchangeAccounts.find(
        (exchangeAccount) =>
          exchangeAccount.id.value === id.value
      ),
    };
  }

  async create(
    exchangeAccount: ExchangeAccount
  ): Promise<
    Result<
      ExchangeAccount,
      PersistenceError
    >
  > {
    this.exchangeAccounts.push(exchangeAccount);

    return {
      success: true,
      data: exchangeAccount,
    };
  }

  async update(
    exchangeAccount: ExchangeAccount
  ): Promise<
    Result<
      ExchangeAccount,
      PersistenceError
    >
  > {
    const index =
      this.exchangeAccounts.findIndex(
        (current) =>
          current.id.value ===
          exchangeAccount.id.value
      );

    if (index >= 0) {
      this.exchangeAccounts[index] =
        exchangeAccount;
    }

    return {
      success: true,
      data: exchangeAccount,
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
    this.exchangeAccounts =
      this.exchangeAccounts.filter(
        (exchangeAccount) =>
          exchangeAccount.id.value !== id.value
      );

    return {
      success: true,
      data: undefined,
    };
  }
}