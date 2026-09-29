import type { EntityId } from "@/contracts/persistence";

import {
  campaignRepository,
} from "@/features/campaign/repositories/campaign.repository.instance";

import {
  createCampaignService,
} from "@/features/campaign/services/campaign.service";

const campaignService =
  createCampaignService(campaignRepository);

export async function getCampaignUseCase(
  id: EntityId
) {
  return campaignService.getById(id);
}

export async function getCampaignsUseCase() {
  return campaignService.getAll();
}
