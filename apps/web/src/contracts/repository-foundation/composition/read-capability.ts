import type {
  EntityId,
  Identifiable,
  Optional,
  Result,
  PersistenceError,
} from "../../persistence";

/**
 * ============================================================
 * ARK Trade Hub
 * Repository Foundation
 * ------------------------------------------------------------
 * Read Capability Contract
 * ============================================================
 */

export interface ReadCapability<
  TEntity extends Identifiable,
> {
  getById(
    id: EntityId
  ): Promise<
    Result<
      Optional<TEntity>,
      PersistenceError
    >
  >;
}