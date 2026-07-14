import type { Exchange } from "../types/exchange";
import type { ExchangeRepository } from "../repositories/exchange.repository";

type ServiceResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };

export function createExchangeService(
  repository: ExchangeRepository
) {
  return {
    async getAll(): Promise<ServiceResult<Exchange[]>> {
      try {
        const exchanges = await repository.getAll();

        return {
          success: true,
          data: exchanges,
        };
      } catch {
        return {
          success: false,
          error: "Failed to load exchanges",
        };
      }
    },
  };
}