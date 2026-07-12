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
 * Create Operation Contract
 * ============================================================
 */

export interface CreateOperation<
  TEntity extends Identifiable,
> {
  create(
    entity: TEntity
  ): Promise<
    Result<TEntity, PersistenceError>
  >;
}