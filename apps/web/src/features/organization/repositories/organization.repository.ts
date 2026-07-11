import type { Organization } from "../types/organization";

export interface OrganizationRepository {
  getAll(): Promise<Organization[]>;

  getById(
    id: string
  ): Promise<Organization | undefined>;

  create(
    organization: Organization
  ): Promise<Organization>;

  update(
    organization: Organization
  ): Promise<Organization>;

  delete(
    id: string
  ): Promise<void>;
}