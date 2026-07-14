import type {
  CollectionResult,
  Optional,
  Result,
} from "../results";

import type {
  EntityId,
  Identifiable,
} from "../identity";

import type {
  PersistenceError,
} from "../errors";

/**
 * ============================================================
 * ARK Trade Hub
 * Persistence Contracts
 * ------------------------------------------------------------
 * Generic Repository Contract
 * ============================================================
 */

export interface Repository<
  TEntity extends Identifiable,
> {
  getAll(): Promise<
    CollectionResult<
      TEntity,
      PersistenceError
    >
  >;

  getById(
    id: EntityId
  ): Promise<
    Result<
      Optional<TEntity>,
      PersistenceError
    >
  >;

  create(
    entity: TEntity
  ): Promise<
    Result<
      TEntity,
      PersistenceError
    >
  >;

  update(
    entity: TEntity
  ): Promise<
    Result<
      TEntity,
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