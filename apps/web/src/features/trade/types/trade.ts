/**
 * ============================================================
 * ARK Trade Hub
 * Domain Model
 * ------------------------------------------------------------
 * Trade
 * ============================================================
 */

import type { EntityId } from "@/contracts/persistence";

export interface Trade {
  /**
   * Internal Identifier
   */
  id: EntityId;

  /**
   * Business Relationships
   */
  campaignId: EntityId;
  exchangeAccountId: EntityId;
  portfolioId: EntityId;

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
