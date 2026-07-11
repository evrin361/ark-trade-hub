import type { Campaign } from "../types/campaign";

export interface CampaignRepository {
  getAll(): Promise<Campaign[]>;

  getById(
    id: string
  ): Promise<Campaign | undefined>;

  create(
    campaign: Campaign
  ): Promise<Campaign>;

  update(
    campaign: Campaign
  ): Promise<Campaign>;

  delete(
    id: string
  ): Promise<void>;
}