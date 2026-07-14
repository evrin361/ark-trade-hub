import type { Result } from "./result";

/**
 * ============================================================
 * ARK Trade Hub
 * Persistence Contracts
 * ------------------------------------------------------------
 * Collection Result Contract
 * ============================================================
 */

export type CollectionResult<T, E> =
  Result<T[], E>;