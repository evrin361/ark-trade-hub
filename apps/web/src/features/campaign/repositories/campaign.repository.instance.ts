import {
  CampaignRepositoryImpl,
} from "./campaign.repository.impl";

import {
  CampaignRepositoryImpl as InfrastructureCampaignRepositoryImpl,
} from "@/infrastructure/persistence/repositories/campaign/campaign-repository.impl";

import type { CampaignRepository } from "./campaign.repository";

export const campaignRepository: CampaignRepository =
  new CampaignRepositoryImpl(
    new InfrastructureCampaignRepositoryImpl()
  );
