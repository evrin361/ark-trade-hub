import type { EntityId } from "@/contracts/persistence";
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

export interface CreateOrganizationData {
  name: string;
  code: string;
}

export function createOrganizationService(
  repository: OrganizationRepository
) {
  return {
    async getAll(): Promise<ServiceResult<Organization[]>> {
      try {
        const organizations =
          await repository.getAll();

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

    async getById(
      id: EntityId
    ): Promise<ServiceResult<Organization>> {
      try {
        const organization =
          await repository.getById(id);

        if (!organization) {
          return {
            success: false,
            error: "Organization not found",
          };
        }

        return {
          success: true,
          data: organization,
        };
      } catch {
        return {
          success: false,
          error: "Failed to get organization",
        };
      }
    },

    async create(
      data: CreateOrganizationData
    ): Promise<ServiceResult<Organization>> {
      try {
        const now = new Date();

        const organization: Organization = {
          id: {
            value: crypto.randomUUID(),
          },

          name: data.name,
          code: data.code,

          enabled: true,
          archived: false,

          createdAt: now,
          updatedAt: now,
        };

        const created =
          await repository.create(
            organization
          );

        return {
          success: true,
          data: created,
        };
      } catch {
        return {
          success: false,
          error: "Failed to create organization",
        };
      }
    },
  };
}
