import type {
  CollectionResult,
  EntityId,
  PersistenceError,
  Result,
} from "@/contracts/persistence";

import type { Exchange } from "@/features/exchange/types/exchange";

export interface ExchangeRepository {
  getAll(): Promise<
    CollectionResult<
      Exchange,
      PersistenceError
    >
  >;

  getById(
    id: EntityId
  ): Promise<
    Result<
      Exchange | undefined,
      PersistenceError
    >
  >;

  create(
    exchange: Exchange
  ): Promise<
    Result<
      Exchange,
      PersistenceError
    >
  >;

  update(
    exchange: Exchange
  ): Promise<
    Result<
      Exchange,
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
