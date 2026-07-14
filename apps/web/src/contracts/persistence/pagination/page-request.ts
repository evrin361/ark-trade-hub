/**
 * ============================================================
 * ARK Trade Hub
 * Persistence Contracts
 * ------------------------------------------------------------
 * Page Request Contract
 * ============================================================
 */

export interface PageRequest {
  readonly page: number;

  readonly size: number;
}