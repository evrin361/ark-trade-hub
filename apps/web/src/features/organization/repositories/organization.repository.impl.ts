import type { Organization } from "../types/organization";
import type { OrganizationRepository } from "./organization.repository";

import type {
  OrganizationRepository as InfrastructureOrganizationRepository,
} from "@/infrastructure/persistence/repositories/organization";

export class OrganizationRepositoryImpl
  implements OrganizationRepository {

  constructor(
    private readonly repository:
      InfrastructureOrganizationRepository
  ) {}

  async getAll(): Promise<Organization[]> {
    const result =
      await this.repository.getAll();

    if (!result.success) {
      throw new Error(
        result.error.message
      );
    }

    return result.data;
  }

  async getById(
    id: Organization["id"]
  ): Promise<Organization | undefined> {
    const result =
      await this.repository.getById(id);

    if (!result.success) {
      throw new Error(
        result.error.message
      );
    }

    return result.data;
  }

  async create(
    organization: Organization
  ): Promise<Organization> {
    const result =
      await this.repository.create(
        organization
      );

    if (!result.success) {
      throw new Error(
        result.error.message
      );
    }

    return result.data;
  }

  async update(
    organization: Organization
  ): Promise<Organization> {
    const result =
      await this.repository.update(
        organization
      );

    if (!result.success) {
      throw new Error(
        result.error.message
      );
    }

    return result.data;
  }

  async delete(
    id: Organization["id"]
  ): Promise<void> {
    const result =
      await this.repository.delete(id);

    if (!result.success) {
      throw new Error(
        result.error.message
      );
    }
  }
}