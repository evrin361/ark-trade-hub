import type {
  EntityId,
  Identifiable,
  Optional,
  PersistenceError,
  Result,
} from "../../persistence";

/**
 * ============================================================
 * ARK Trade Hub
 * Repository Foundation
 * ------------------------------------------------------------
 * Find By Id Operation Contract
 * ============================================================
 */

export interface FindByIdOperation<
  TEntity extends Identifiable,
> {
  findById(
    id: EntityId
  ): Promise<
    Result<
      Optional<TEntity>,
      PersistenceError
    >
  >;
}