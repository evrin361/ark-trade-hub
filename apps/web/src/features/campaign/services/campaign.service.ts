import type { EntityId } from "@/contracts/persistence";

import type { Campaign } from "../types/campaign";
import type { CampaignRepository } from "../repositories/campaign.repository";

type ServiceResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };

export interface CreateCampaignInput {
  name: string;
  code: string;
}

export interface UpdateCampaignInput {
  id: EntityId;
  name: string;
  code: string;
}

export function createCampaignService(
  repository: CampaignRepository
) {
  return {
    async getAll(): Promise<
      ServiceResult<Campaign[]>
    > {
      try {
        const campaigns =
          await repository.getAll();

        return {
          success: true,
          data: campaigns,
        };
      } catch {
        return {
          success: false,
          error: "Failed to load campaigns",
        };
      }
    },

    async getById(
      id: EntityId
    ): Promise<ServiceResult<Campaign>> {
      try {
        const campaign =
          await repository.getById(id);

        if (!campaign) {
          return {
            success: false,
            error: "Campaign not found",
          };
        }

        return {
          success: true,
          data: campaign,
        };
      } catch {
        return {
          success: false,
          error: "Failed to load campaign",
        };
      }
    },

    async create(
      input: CreateCampaignInput
    ): Promise<ServiceResult<Campaign>> {
      try {
        const now = new Date();

        const campaign: Campaign = {
          id: {
            value: crypto.randomUUID(),
          },
          name: input.name,
          code: input.code,
          enabled: true,
          archived: false,
          createdAt: now,
          updatedAt: now,
        };

        const created =
          await repository.create(campaign);

        return {
          success: true,
          data: created,
        };
      } catch {
        return {
          success: false,
          error: "Failed to create campaign",
        };
      }
    },

    async update(
      input: UpdateCampaignInput
    ): Promise<ServiceResult<Campaign>> {
      try {
        const existing =
          await repository.getById(input.id);

        if (!existing) {
          return {
            success: false,
            error: "Campaign not found",
          };
        }

        const updated: Campaign = {
          ...existing,
          name: input.name,
          code: input.code,
          updatedAt: new Date(),
        };

        const result =
          await repository.update(updated);

        return {
          success: true,
          data: result,
        };
      } catch {
        return {
          success: false,
          error: "Failed to update campaign",
        };
      }
    },

    async archive(
      id: EntityId
    ): Promise<ServiceResult<Campaign>> {
      try {
        const existing =
          await repository.getById(id);

        if (!existing) {
          return {
            success: false,
            error: "Campaign not found",
          };
        }

        const archived: Campaign = {
          ...existing,
          enabled: false,
          archived: true,
          updatedAt: new Date(),
        };

        const result =
          await repository.update(archived);

        return {
          success: true,
          data: result,
        };
      } catch {
        return {
          success: false,
          error: "Failed to archive campaign",
        };
      }
    },

    async restore(
      id: EntityId
    ): Promise<ServiceResult<Campaign>> {
      try {
        const existing =
          await repository.getById(id);

        if (!existing) {
          return {
            success: false,
            error: "Campaign not found",
          };
        }

        const restored: Campaign = {
          ...existing,
          archived: false,
          updatedAt: new Date(),
        };

        const result =
          await repository.update(restored);

        return {
          success: true,
          data: result,
        };
      } catch {
        return {
          success: false,
          error: "Failed to restore campaign",
        };
      }
    },

    async enable(
      id: EntityId
    ): Promise<ServiceResult<Campaign>> {
      try {
        const existing =
          await repository.getById(id);

        if (!existing) {
          return {
            success: false,
            error: "Campaign not found",
          };
        }

        const enabled: Campaign = {
          ...existing,
          enabled: true,
          updatedAt: new Date(),
        };

        const result =
          await repository.update(enabled);

        return {
          success: true,
          data: result,
        };
      } catch {
        return {
          success: false,
          error: "Failed to enable campaign",
        };
      }
    },

    async disable(
      id: EntityId
    ): Promise<ServiceResult<Campaign>> {
      try {
        const existing =
          await repository.getById(id);

        if (!existing) {
          return {
            success: false,
            error: "Campaign not found",
          };
        }

        const disabled: Campaign = {
          ...existing,
          enabled: false,
          updatedAt: new Date(),
        };

        const result =
          await repository.update(disabled);

        return {
          success: true,
          data: result,
        };
      } catch {
        return {
          success: false,
          error: "Failed to disable campaign",
        };
      }
    },

    async delete(
      id: EntityId
    ): Promise<ServiceResult<void>> {
      try {
        const existing =
          await repository.getById(id);

        if (!existing) {
          return {
            success: false,
            error: "Campaign not found",
          };
        }

        await repository.delete(id);

        return {
          success: true,
          data: undefined,
        };
      } catch {
        return {
          success: false,
          error: "Failed to delete campaign",
        };
      }
    },
  };
}
