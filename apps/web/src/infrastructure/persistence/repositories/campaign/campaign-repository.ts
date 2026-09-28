import type {
  CollectionResult,
  EntityId,
  PersistenceError,
  Result,
} from "@/contracts/persistence";

import type { Campaign } from "@/features/campaign/types/campaign";

export interface CampaignRepository {
  getAll(): Promise<
    CollectionResult<
      Campaign,
      PersistenceError
    >
  >;

  getById(
    id: EntityId
  ): Promise<
    Result<
      Campaign | undefined,
      PersistenceError
    >
  >;

  create(
    campaign: Campaign
  ): Promise<
    Result<
      Campaign,
      PersistenceError
    >
  >;

  update(
    campaign: Campaign
  ): Promise<
    Result<
      Campaign,
      PersistenceError
    >
  >;

  delete(
    id: EntityId
  ): Promise<
    Result<
      void,
      PersistenceError
    >
  >;
}
