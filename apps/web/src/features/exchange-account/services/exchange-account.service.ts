import type { ExchangeAccount } from "../types/exchange-account";
import type { ExchangeAccountRepository } from "../repositories/exchange-account.repository";

type ServiceResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };

export function createExchangeAccountService(
  repository: ExchangeAccountRepository
) {
  return {
    async getAll(): Promise<ServiceResult<ExchangeAccount[]>> {
      try {
        const exchangeAccounts = await repository.getAll();

        return {
          success: true,
          data: exchangeAccounts,
        };
      } catch {
        return {
          success: false,
          error: "Failed to load exchange accounts",
        };
      }
    },
  };
}