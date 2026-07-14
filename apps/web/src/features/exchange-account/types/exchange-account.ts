/**
 * ============================================================
 * ARK Trade Hub
 * Domain Model
 * ------------------------------------------------------------
 * Exchange Account
 * ============================================================
 */

export interface ExchangeAccount {
  /**
   * Internal Identifier
   */
  id: string;

  /**
   * Business Information
   */
  name: string;

  code: string;

  /**
   * Lifecycle
   */
  enabled: boolean;

  archived: boolean;

  /**
   * Audit
   */
  createdAt: Date;

  updatedAt: Date;
}