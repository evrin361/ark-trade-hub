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

export function createCampaignService(
  repository: CampaignRepository
) {
  return {
    async getAll(): Promise<ServiceResult<Campaign[]>> {
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
  };
}