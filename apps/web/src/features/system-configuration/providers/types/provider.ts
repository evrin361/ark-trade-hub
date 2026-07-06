/**
 * ============================================================
 * ARK Trade Hub
 * Domain Model
 * ------------------------------------------------------------
 * Provider
 * ============================================================
 */

export interface Provider {
  /**
   * Internal Identifier
   */
  id: string;

  /**
   * Parent Market
   */
  marketId: string;

  /**
   * Display Name
   * Example:
   * Nobitex
   */
  name: string;

  /**
   * Unique Code
   * Example:
   * nobitex
   */
  code: string;

  /**
   * Display Order
   */
  order: number;

  /**
   * Is available?
   */
  enabled: boolean;

  /**
   * Audit
   */
  createdAt: Date;

  updatedAt: Date;
}