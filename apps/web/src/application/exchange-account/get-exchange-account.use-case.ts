import type { EntityId } from "@/contracts/persistence";
import type { ExchangeAccount } from "@/features/exchange-account";

import {
  createExchangeAccountService,
} from "@/features/exchange-account/services/exchange-account.service";

import {
  exchangeAccountRepository,
} from "@/features/exchange-account/repositories/exchange-account.repository.instance";

export type GetExchangeAccountResult =
  | {
      success: true;
      data: ExchangeAccount;
    }
  | {
      success: false;
      error: string;
    };

export function createGetExchangeAccountUseCase() {
  const service =
    createExchangeAccountService(
      exchangeAccountRepository
    );

  return {
    async execute(
      id: EntityId
    ): Promise<GetExchangeAccountResult> {
      return service.getById(id);
    },
  };
}