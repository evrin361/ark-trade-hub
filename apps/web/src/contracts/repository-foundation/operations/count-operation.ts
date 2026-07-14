import type {
  PersistenceError,
  Result,
} from "../../persistence";

/**
 * ============================================================
 * ARK Trade Hub
 * Repository Foundation
 * ------------------------------------------------------------
 * Count Operation Contract
 * ============================================================
 */

export interface CountOperation {
  count(): Promise<
    Result<number, PersistenceError>
  >;
}