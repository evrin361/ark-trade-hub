import type { Organization } from "@/features/organization";
import { createOrganizationService } from "@/features/organization/services/organization.service";
import { organizationRepository } from "@/features/organization/repositories/organization.repository.instance";

export type ListOrganizationsResult =
  | {
      success: true;
      data: Organization[];
    }
  | {
      success: false;
      error: string;
    };

export function createListOrganizationsUseCase() {
  const service = createOrganizationService(organizationRepository);

  return {
    async execute(): Promise<ListOrganizationsResult> {
      return service.getAll();
    },
  };
}
