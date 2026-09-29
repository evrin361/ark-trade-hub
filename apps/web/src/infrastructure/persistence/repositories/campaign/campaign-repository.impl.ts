import type {
  CollectionResult,
  EntityId,
  PersistenceError,
  Result,
} from "@/contracts/persistence";

import type { Campaign } from "@/features/campaign/types/campaign";

import type { CampaignRepository } from "./campaign-repository";

export class CampaignRepositoryImpl
  implements CampaignRepository
{
  private campaigns: Campaign[] = [];

  async getAll(): Promise<
    CollectionResult<
      Campaign,
      PersistenceError
    >
  > {
    return {
      success: true,
      data: [...this.campaigns],
    };
  }

  async getById(
    id: EntityId
  ): Promise<
    Result<
      Campaign | undefined,
      PersistenceError
    >
  > {
    return {
      success: true,
      data: this.campaigns.find(
        (campaign) =>
          campaign.id.value === id.value
      ),
    };
  }

  async create(
    campaign: Campaign
  ): Promise<
    Result<
      Campaign,
      PersistenceError
    >
  > {
    this.campaigns.push(campaign);

    return {
      success: true,
      data: campaign,
    };
  }

  async update(
    campaign: Campaign
  ): Promise<
    Result<
      Campaign,
      PersistenceError
    >
  > {
    const index =
      this.campaigns.findIndex(
        (current) =>
          current.id.value === campaign.id.value
      );

    if (index >= 0) {
      this.campaigns[index] = campaign;
    }

    return {
      success: true,
      data: campaign,
    };
  }

  async delete(
    id: EntityId
  ): Promise<
    Result<
      void,
      PersistenceError
    >
  > {
    this.campaigns =
      this.campaigns.filter(
        (campaign) =>
          campaign.id.value !== id.value
      );

    return {
      success: true,
      data: undefined,
    };
  }
}
