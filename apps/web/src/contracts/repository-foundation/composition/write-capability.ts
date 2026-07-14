import type {
  Identifiable,
  PersistenceError,
  Result,
} from "../../persistence";

/**
 * ============================================================
 * ARK Trade Hub
 * Repository Foundation
 * ------------------------------------------------------------
 * Write Capability Contract
 * ============================================================
 */

export interface WriteCapability<
  TEntity extends Identifiable,
> {
  create(
    entity: TEntity
  ): Promise<
    Result<TEntity, PersistenceError>
  >;

  update(
    entity: TEntity
  ): Promise<
    Result<TEntity, PersistenceError>
  >;

  delete(
    entity: TEntity
  ): Promise<
    Result<void, PersistenceError>
  >;
}