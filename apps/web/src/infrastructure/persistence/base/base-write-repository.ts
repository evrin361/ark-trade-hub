/**
 * ============================================================
 * ARK Trade Hub
 * Repository Implementation Foundation
 * ------------------------------------------------------------
 * Base Write Repository Contract
 * ============================================================
 */

import type {
  Identifiable,
} from "@/contracts/persistence";

import type {
  BaseRepository,
} from "./base-repository";

export interface BaseWriteRepository<
  TEntity extends Identifiable,
> extends BaseRepository<TEntity> {}