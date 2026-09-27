/**
 * ============================================================
 * ARK Trade Hub
 * Domain Model
 * ------------------------------------------------------------
 * Exchange Account
 * ============================================================
 */

import type { EntityId } from "@/contracts/persistence";

export interface ExchangeAccount {
  /**
   * Internal Identifier
   */
  id: EntityId;

  /**
   * Business Relationships
   */
  portfolioId: EntityId;

  exchangeId: EntityId;

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