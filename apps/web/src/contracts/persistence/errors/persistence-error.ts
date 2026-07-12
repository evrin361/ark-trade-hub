/**
 * ============================================================
 * ARK Trade Hub
 * Persistence Contracts
 * ------------------------------------------------------------
 * Persistence Error Contract
 * ============================================================
 */

export interface PersistenceError {
  readonly code: string;

  readonly message: string;
}
