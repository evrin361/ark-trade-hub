/**
 * ============================================================
 * ARK Trade Hub
 * Repository Foundation
 * ------------------------------------------------------------
 * Filter Definition Contract
 * ============================================================
 */

export interface FilterDefinition {
  readonly field: string;

  readonly value: unknown;
}