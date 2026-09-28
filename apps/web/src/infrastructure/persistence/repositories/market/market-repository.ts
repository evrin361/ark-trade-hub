import type {
  CollectionResult,
  EntityId,
  PersistenceError,
  Result,
} from "@/contracts/persistence";

import type { Market } from "@/features/market/types/market";

export interface MarketRepository {
  getAll(): Promise<
    CollectionResult<
      Market,
      PersistenceError
    >
  >;

  getById(
    id: EntityId
  ): Promise<
    Result<
      Market | undefined,
      PersistenceError
    >
  >;

  create(
    market: Market
  ): Promise<
    Result<
      Market,
      PersistenceError
    >
  >;

  update(
    market: Market
  ): Promise<
    Result<
      Market,
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
