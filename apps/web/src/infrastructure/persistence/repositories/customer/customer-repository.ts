/**
 * ============================================================
 * ARK Trade Hub
 * Customer Repository
 * ------------------------------------------------------------
 * Customer Repository Contract
 * ============================================================
 */

import type {
  BaseReadRepository,
} from "../../base/base-read-repository";

import type {
  BaseWriteRepository,
} from "../../base/base-write-repository";

export interface CustomerRepository
  extends
    BaseReadRepository,
    BaseWriteRepository {}