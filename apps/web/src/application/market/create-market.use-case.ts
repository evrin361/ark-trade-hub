import {
  marketRepository,
} from "@/features/market/repositories/market.repository.instance";

import {
  createMarketService,
  type CreateMarketInput,
} from "@/features/market/services/market.service";

const marketService =
  createMarketService(
    marketRepository
  );

export async function createMarket(
  input: CreateMarketInput
) {
  return marketService.create(input);
}
