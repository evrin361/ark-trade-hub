import type { EntityId } from "@/contracts/persistence";

/**
 * ============================================================
 * ARK Trade Hub
 * Domain Model
 * ------------------------------------------------------------
 * Market
 * ============================================================
 */

export interface Market {
  id: EntityId;

  name: string;

  code: string;

  enabled: boolean;

  archived: boolean;

  createdAt: Date;

  updatedAt: Date;
}
