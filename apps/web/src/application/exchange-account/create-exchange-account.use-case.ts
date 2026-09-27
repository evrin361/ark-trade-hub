import type { ExchangeAccount } from "@/features/exchange-account";
import type { EntityId } from "@/contracts/persistence";

import {
  createExchangeAccountService,
} from "@/features/exchange-account/services/exchange-account.service";

import {
  exchangeAccountRepository,
} from "@/features/exchange-account/repositories/exchange-account.repository.instance";

export type CreateExchangeAccountInput = {
  portfolioId: EntityId;
  exchangeId: EntityId;
  name: string;
  code: string;
};

export type CreateExchangeAccountResult =
  | {
      success: true;
      data: ExchangeAccount;
    }
  | {
      success: false;
      error: string;
    };

export function createExchangeAccountUseCase() {
  const service =
    createExchangeAccountService(
      exchangeAccountRepository
    );

  return {
    async execute(
      input: CreateExchangeAccountInput
    ): Promise<CreateExchangeAccountResult> {
      return service.create(input);
    },
  };
}