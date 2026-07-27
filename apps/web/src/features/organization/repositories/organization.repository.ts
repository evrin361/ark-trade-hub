import type { Organization } from "../types/organization";

export interface OrganizationRepository {
  getAll(): Promise<Organization[]>;

  getById(
    id: Organization["id"]
  ): Promise<Organization | undefined>;

  create(
    organization: Organization
  ): Promise<Organization>;

  update(
    organization: Organization
  ): Promise<Organization>;

  delete(
    id: Organization["id"]
  ): Promise<void>;
}