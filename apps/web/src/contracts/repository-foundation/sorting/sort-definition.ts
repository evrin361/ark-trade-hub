import type { SortDirection } from "./sort-direction";

/**
 * ============================================================
 * ARK Trade Hub
 * Repository Foundation
 * ------------------------------------------------------------
 * Sort Definition Contract
 * ============================================================
 */

export interface SortDefinition {
  readonly field: string;

  readonly direction: SortDirection;
}