/**
 * ============================================================
 * ARK Trade Hub
 * Domain Model
 * ------------------------------------------------------------
 * Portfolio
 * ============================================================
 */

export interface Portfolio {
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