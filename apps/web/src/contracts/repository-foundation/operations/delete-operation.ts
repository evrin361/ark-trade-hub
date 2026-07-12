import type {
  EntityId,
  PersistenceError,
  Result,
} from "../../persistence";

/**
 * ============================================================
 * ARK Trade Hub
 * Repository Foundation
 * ------------------------------------------------------------
 * Delete Operation Contract
 * ============================================================
 */

export interface DeleteOperation {
  delete(
    id: EntityId
  ): Promise<
    Result<void, PersistenceError>
  >;
}