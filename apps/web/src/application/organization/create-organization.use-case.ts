import type { Organization } from "@/features/organization";
import { createOrganizationService } from "@/features/organization/services/organization.service";
import { organizationRepository } from "@/features/organization/repositories/organization.repository.instance";

export interface CreateOrganizationInput {
  name: string;
  code: string;
}

export type CreateOrganizationResult =
  | {
      success: true;
      data: Organization;
    }
  | {
      success: false;
      error: string;
    };

export function createOrganizationUseCase() {
  const service =
    createOrganizationService(
      organizationRepository
    );

  return {
    async execute(
      input: CreateOrganizationInput
    ): Promise<CreateOrganizationResult> {
      return service.create(input);
    },
  };
}
