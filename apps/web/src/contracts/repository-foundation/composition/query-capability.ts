import type {
  CollectionResult,
  Identifiable,
  PersistenceError,
} from "../../persistence";

/**
 * ============================================================
 * ARK Trade Hub
 * Repository Foundation
 * ------------------------------------------------------------
 * Query Capability Contract
 * ============================================================
 */

export interface QueryCapability<
  TEntity extends Identifiable,
> {
  getAll(): Promise<
    CollectionResult<
      TEntity,
      PersistenceError
    >
  >;
}