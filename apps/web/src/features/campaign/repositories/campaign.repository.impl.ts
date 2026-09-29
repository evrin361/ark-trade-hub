import type { EntityId } from "@/contracts/persistence";

import type { Campaign } from "../types/campaign";
import type { CampaignRepository } from "./campaign.repository";

import type {
  CampaignRepository as InfrastructureCampaignRepository,
} from "@/infrastructure/persistence/repositories/campaign/campaign-repository";

export class CampaignRepositoryImpl
  implements CampaignRepository
{
  constructor(
    private readonly repository:
      InfrastructureCampaignRepository
  ) {}

  async getAll(): Promise<Campaign[]> {
    const result =
      await this.repository.getAll();

    if (!result.success) {
      throw new Error(result.error.message);
    }

    return result.data;
  }

  async getById(
    id: EntityId
  ): Promise<Campaign | undefined> {
    const result =
      await this.repository.getById(id);

    if (!result.success) {
      throw new Error(result.error.message);
    }

    return result.data;
  }

  async create(
    campaign: Campaign
  ): Promise<Campaign> {
    const result =
      await this.repository.create(campaign);

    if (!result.success) {
      throw new Error(result.error.message);
    }

    return result.data;
  }

  async update(
    campaign: Campaign
  ): Promise<Campaign> {
    const result =
      await this.repository.update(campaign);

    if (!result.success) {
      throw new Error(result.error.message);
    }

    return result.data;
  }

  async delete(
    id: EntityId
  ): Promise<void> {
    const result =
      await this.repository.delete(id);

    if (!result.success) {
      throw new Error(result.error.message);
    }
  }
}
