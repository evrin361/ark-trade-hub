import { ExchangeAccountRepositoryImpl } from "./exchange-account.repository.impl";

import {
  ExchangeAccountRepositoryImpl as InfrastructureExchangeAccountRepositoryImpl,
} from "@/infrastructure/persistence/repositories/exchange-account/exchange-account-repository.impl";

import type { ExchangeAccountRepository } from "./exchange-account.repository";

export const exchangeAccountRepository:
  ExchangeAccountRepository =
  new ExchangeAccountRepositoryImpl(
    new InfrastructureExchangeAccountRepositoryImpl()
  );