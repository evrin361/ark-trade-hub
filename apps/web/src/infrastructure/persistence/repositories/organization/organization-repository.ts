/**
 * ============================================================
 * ARK Trade Hub
 * Organization Repository
 * ------------------------------------------------------------
 * Organization Repository Contract
 * ============================================================
 */

import type { Organization } from "@/features/organization/types/organization";

import type {
  BaseReadRepository,
} from "../../base/base-read-repository";

import type {
  BaseWriteRepository,
} from "../../base/base-write-repository";

export interface OrganizationRepository
  extends
    BaseReadRepository<Organization>,
    BaseWriteRepository<Organization> {}