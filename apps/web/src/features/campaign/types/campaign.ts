/**
 * ============================================================
 * ARK Trade Hub
 * Domain Model
 * ------------------------------------------------------------
 * Campaign
 * ============================================================
 */

import type { EntityId } from "@/contracts/persistence";

export interface Campaign {
  /**
   * Internal Identifier
   */
  id: EntityId;
  organizationId: EntityId;

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
