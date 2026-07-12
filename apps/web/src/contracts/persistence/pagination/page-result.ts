import type { PageMetadata } from "./page-metadata";

/**
 * ============================================================
 * ARK Trade Hub
 * Persistence Contracts
 * ------------------------------------------------------------
 * Page Result Contract
 * ============================================================
 */

export interface PageResult<T> {
  readonly items: readonly T[];

  readonly metadata: PageMetadata;
}