import type { EntityId } from "@/contracts/persistence";
import type { Organization } from "@/features/organization";
import { createOrganizationService } from "@/features/organization/services/organization.service";
import { organizationRepository } from "@/features/organization/repositories/organization.repository.instance";

export type GetOrganizationResult =
  | {
      success: true;
      data: Organization;
    }
  | {
      success: false;
      error: string;
    };

export function createGetOrganizationUseCase() {
  const service =
    createOrganizationService(
      organizationRepository
    );

  return {
    async execute(
      id: EntityId
    ): Promise<GetOrganizationResult> {
      return service.getById(id);
    },
  };
}
