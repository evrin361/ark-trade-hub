import type { Organization } from "@/features/organization";

import type { OrganizationRepository } from "./organization-repository";

export class OrganizationRepositoryImpl
  implements OrganizationRepository {

  private organizations: Organization[] = [];

  async getAll() {
    return {
      success: true as const,
      data: this.organizations,
    };
  }

  async getById(
    id: Organization["id"]
  ) {
    return {
      success: true as const,
      data: this.organizations.find(
        organization => organization.id === id
      ),
    };
  }

  async create(
    organization: Organization
  ) {
    this.organizations.push(
      organization
    );

    return {
      success: true as const,
      data: organization,
    };
  }

  async update(
    organization: Organization
  ) {
    const index =
      this.organizations.findIndex(
        current =>
          current.id === organization.id
      );

    if (index >= 0) {
      this.organizations[index] =
        organization;
    }

    return {
      success: true as const,
      data: organization,
    };
  }

  async delete(
    id: Organization["id"]
  ) {
    this.organizations =
      this.organizations.filter(
        organization =>
          organization.id !== id
      );

    return {
      success: true as const,
      data: undefined,
    };
  }
}