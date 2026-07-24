/**
 * ============================================================
 * ARK Trade Hub
 * Customer Repository
 * ------------------------------------------------------------
 * Customer Repository Contract
 * ============================================================
 */

import type { Customer } from "@/features/customers/types/customer";

import type {
  BaseReadRepository,
} from "../../base/base-read-repository";

import type {
  BaseWriteRepository,
} from "../../base/base-write-repository";

export interface CustomerRepository
  extends
    BaseReadRepository<Customer>,
    BaseWriteRepository<Customer> {}