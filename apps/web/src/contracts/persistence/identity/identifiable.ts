import type { EntityId } from "./entity-id";

/**
 * ============================================================
 * ARK Trade Hub
 * Persistence Contracts
 * ------------------------------------------------------------
 * Identifiable Entity Contract
 * ============================================================
 */

export interface Identifiable {
  readonly id: EntityId;
}