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
 * Update Operation Contract
 * ============================================================
 */

export interface UpdateOperation<
  TEntity extends Identifiable,
> {
  update(
    entity: TEntity
  ): Promise<
    Result<TEntity, PersistenceError>
  >;
}