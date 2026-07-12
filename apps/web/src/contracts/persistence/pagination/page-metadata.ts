/**
 * ============================================================
 * ARK Trade Hub
 * Persistence Contracts
 * ------------------------------------------------------------
 * Page Metadata Contract
 * ============================================================
 */

export interface PageMetadata {
  readonly page: number;

  readonly size: number;

  readonly totalItems: number;

  readonly totalPages: number;
}