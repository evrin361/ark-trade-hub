import {
  TradeRepositoryImpl,
} from "./trade.repository.impl";

import {
  TradeRepositoryImpl as InfrastructureTradeRepositoryImpl,
} from "@/infrastructure/persistence/repositories/trade/trade-repository.impl";

import type { TradeRepository } from "./trade.repository";

export const tradeRepository: TradeRepository =
  new TradeRepositoryImpl(
    new InfrastructureTradeRepositoryImpl()
  );
