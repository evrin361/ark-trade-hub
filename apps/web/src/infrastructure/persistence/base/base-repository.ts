/**
 * ============================================================
 * ARK Trade Hub
 * Repository Implementation Foundation
 * ------------------------------------------------------------
 * Base Repository Contract
 * ============================================================
 */

import type {
  Identifiable,
  Repository,
} from "@/contracts/persistence";

export interface BaseRepository<
  TEntity extends Identifiable,
> extends Repository<TEntity> {}