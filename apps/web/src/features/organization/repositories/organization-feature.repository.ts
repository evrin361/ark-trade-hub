import type { Organization } from "../types/organization";

import type { OrganizationRepository } from "./organization.repository";


import {
  OrganizationRepository as InfrastructureOrganizationRepository,
} from "@/infrastructure/persistence/repositories/organization";

export class OrganizationFeatureRepository
  implements OrganizationRepository {

   constructor(
  private readonly repository: InfrastructureOrganizationRepository,
) {}


async getAll(): Promise<Organization[]> {
  const result = await this.repository.getAll();

  if (!result.success) {
    throw new Error(result.error.message);
  }

  return result.data;
}
  async getById(
  id: Organization["id"]
): Promise<Organization | undefined> {
  throw new Error("Not implemented");
}

  async create(
    organization: Organization
  ): Promise<Organization> {
    throw new Error("Not implemented");
  }

  async update(
    organization: Organization
  ): Promise<Organization> {
    throw new Error("Not implemented");
  }

  async delete(
  id: Organization["id"]
): Promise<void> {
  throw new Error("Not implemented");
}
}

  

