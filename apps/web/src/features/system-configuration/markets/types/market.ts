/**
 * ============================================================
 * ARK Trade Hub
 * Domain Model
 * ------------------------------------------------------------
 * Market
 * ============================================================
 */

export interface Market {
  /**
   * Internal Identifier
   */
  id: string;

  /**
   * Display Name
   * Example:
   * Cryptocurrency
   */
  name: string;

  /**
   * Unique Code
   * Example:
   * crypto
   */
  code: string;

  /**
   * Display Order
   */
  order: number;

  /**
   * Is available for customers?
   */
  enabled: boolean;

  /**
   * Audit
   */
  createdAt: Date;

  updatedAt: Date;
}