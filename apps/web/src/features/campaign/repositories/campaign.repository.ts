import type { EntityId } from "@/contracts/persistence";
import type { Campaign } from "../types/campaign";

export interface CampaignRepository {
  getAll(): Promise<Campaign[]>;

  getById(
    id: EntityId
  ): Promise<Campaign | undefined>;

  create(
    campaign: Campaign
  ): Promise<Campaign>;

  update(
    campaign: Campaign
  ): Promise<Campaign>;

  delete(
    id: EntityId
  ): Promise<void>;
}
