/**
 * ============================================================
 * ARK Trade Hub
 * Domain Model
 * ------------------------------------------------------------
 * Organization
 * ============================================================
 */
import type { EntityId } from "@/contracts/persistence";

export interface Organization {
  /**
   * Internal Identifier
   */
  id: EntityId;

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