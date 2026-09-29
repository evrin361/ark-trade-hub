import type {
  CollectionResult,
  EntityId,
  PersistenceError,
  Result,
} from "@/contracts/persistence";

import type { Trade } from "@/features/trade/types/trade";

export interface TradeRepository {
  getAll(): Promise<
    CollectionResult<
      Trade,
      PersistenceError
    >
  >;

  getById(
    id: EntityId
  ): Promise<
    Result<
      Trade | undefined,
      PersistenceError
    >
  >;

  create(
    trade: Trade
  ): Promise<
    Result<
      Trade,
      PersistenceError
    >
  >;

  update(
    trade: Trade
  ): Promise<
    Result<
      Trade,
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
