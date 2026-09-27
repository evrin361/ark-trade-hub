import type { EntityId } from "@/contracts/persistence";
import type { ExchangeAccount } from "../types/exchange-account";

export interface ExchangeAccountRepository {
  getAll(): Promise<ExchangeAccount[]>;

  getById(
    id: EntityId
  ): Promise<ExchangeAccount | undefined>;

  create(
    exchangeAccount: ExchangeAccount
  ): Promise<ExchangeAccount>;

  update(
    exchangeAccount: ExchangeAccount
  ): Promise<ExchangeAccount>;

  delete(
    id: EntityId
  ): Promise<void>;
}