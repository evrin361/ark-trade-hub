/**
 * ============================================================
 * ARK Trade Hub
 * Persistence Mapping Foundation
 * ------------------------------------------------------------
 * Base Entity Mapper Contract
 * ============================================================
 */

import type {
  EntityMapper,
} from "../contracts";

import type {
  BaseMapper,
} from "./base-mapper";

export interface BaseEntityMapper
  extends EntityMapper,
    BaseMapper {}