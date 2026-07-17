/**
 * ============================================================
 * ARK Trade Hub
 * Repository Implementation Foundation
 * ------------------------------------------------------------
 * Base Read Repository Contract
 * ============================================================
 */

import type {
  Identifiable,
} from "@/contracts/persistence";

import type {
  BaseRepository,
} from "./base-repository";

export interface BaseReadRepository<
  TEntity extends Identifiable,
> extends BaseRepository<TEntity> {}