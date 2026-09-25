/**
 * ============================================================
 * ARK Trade Hub
 * Domain Model
 * ------------------------------------------------------------
 * Portfolio
 * ============================================================
 */

import type { EntityId } from "@/contracts/persistence";

export interface Portfolio {
  /**
   * Internal Identifier
   */
  id: EntityId;

  /**
   * Business Owner
   */
  customerId: EntityId;

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