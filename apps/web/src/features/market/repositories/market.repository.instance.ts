import {
  MarketRepositoryImpl,
} from "./market.repository.impl";

import {
  MarketRepositoryImpl as InfrastructureMarketRepositoryImpl,
} from "@/infrastructure/persistence/repositories/market/market-repository.impl";

import type { MarketRepository } from "./market.repository";

export const marketRepository: MarketRepository =
  new MarketRepositoryImpl(
    new InfrastructureMarketRepositoryImpl()
  );
