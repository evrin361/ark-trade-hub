import type {
  CollectionResult,
  EntityId,
  PersistenceError,
  Result,
} from "@/contracts/persistence";

import type { ExchangeAccount } from "@/features/exchange-account/types/exchange-account";

export interface ExchangeAccountRepository {
  getAll(): Promise<
    CollectionResult<
      ExchangeAccount,
      PersistenceError
    >
  >;

  getById(
    id: EntityId
  ): Promise<
    Result<
      ExchangeAccount | undefined,
      PersistenceError
    >
  >;

  create(
    exchangeAccount: ExchangeAccount
  ): Promise<
    Result<
      ExchangeAccount,
      PersistenceError
    >
  >;

  update(
    exchangeAccount: ExchangeAccount
  ): Promise<
    Result<
      ExchangeAccount,
      PersistenceError
    >
  >;

  delete(
    id: EntityId
  ): Promise<
    Result<
      void,
      PersistenceError
    >
  >;
}