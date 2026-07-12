import type { PersistenceError } from "./persistence-error";

/**
 * ============================================================
 * ARK Trade Hub
 * Persistence Contracts
 * ------------------------------------------------------------
 * Concurrency Conflict Error Contract
 * ============================================================
 */

export interface ConcurrencyConflictError extends PersistenceError {}