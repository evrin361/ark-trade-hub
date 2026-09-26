import { ExchangeRepositoryImpl } from "./exchange.repository.impl";

import {
  ExchangeRepositoryImpl as InfrastructureExchangeRepositoryImpl,
} from "@/infrastructure/persistence/repositories/exchange/exchange-repository.impl";

import type { ExchangeRepository } from "./exchange.repository";

export const exchangeRepository: ExchangeRepository =
  new ExchangeRepositoryImpl(
    new InfrastructureExchangeRepositoryImpl()
  );
