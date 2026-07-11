import type { Organization } from "../types/organization";
import type { OrganizationRepository } from "../repositories/organization.repository";

type ServiceResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };

export function createOrganizationService(
  repository: OrganizationRepository
) {
  return {
    async getAll(): Promise<ServiceResult<Organization[]>> {
      try {
        const organizations = await repository.getAll();

        return {
          success: true,
          data: organizations,
        };
      } catch {
        return {
          success: false,
          error: "Failed to load organizations",
        };
      }
    },
  };
}