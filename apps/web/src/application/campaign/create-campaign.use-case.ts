import type {
  CreateCampaignInput,
} from "@/features/campaign/services/campaign.service";

import {
  campaignRepository,
} from "@/features/campaign/repositories/campaign.repository.instance";

import {
  createCampaignService,
} from "@/features/campaign/services/campaign.service";

const campaignService =
  createCampaignService(campaignRepository);

export async function createCampaignUseCase(
  input: CreateCampaignInput
) {
  return campaignService.create(input);
}
