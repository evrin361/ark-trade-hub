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
 * Exists Operation Contract
 * ============================================================
 */

export interface ExistsOperation {
  exists(
    id: EntityId
  ): Promise<
    Result<boolean, PersistenceError>
  >;
}