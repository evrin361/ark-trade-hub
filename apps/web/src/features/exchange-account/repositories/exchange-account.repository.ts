import type { ExchangeAccount } from "../types/exchange-account";

export interface ExchangeAccountRepository {
  getAll(): Promise<ExchangeAccount[]>;

  getById(
    id: string
  ): Promise<ExchangeAccount | undefined>;

  create(
    exchangeAccount: ExchangeAccount
  ): Promise<ExchangeAccount>;

  update(
    exchangeAccount: ExchangeAccount
  ): Promise<ExchangeAccount>;

  delete(
    id: string
  ): Promise<void>;
}