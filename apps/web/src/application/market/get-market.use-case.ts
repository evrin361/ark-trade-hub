import type { EntityId } from "@/contracts/persistence";

import {
  marketRepository,
} from "@/features/market/repositories/market.repository.instance";

import {
  createMarketService,
} from "@/features/market/services/market.service";

const marketService =
  createMarketService(
    marketRepository
  );

export async function getMarket(
  id: EntityId
) {
  return marketService.getById(id);
}
