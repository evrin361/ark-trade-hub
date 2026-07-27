import { OrganizationRepositoryImpl } from "./organization.repository.impl";

import { MockOrganizationRepository } from "@/infrastructure/persistence/repositories/organization/mock-organization-repository";

import type { OrganizationRepository } from "./organization.repository";

export const organizationRepository: OrganizationRepository =
  new OrganizationRepositoryImpl(
    new MockOrganizationRepository()
  );