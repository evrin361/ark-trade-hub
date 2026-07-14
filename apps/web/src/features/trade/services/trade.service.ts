import type { Trade } from "../types/trade";
import type { TradeRepository } from "../repositories/trade.repository";

type ServiceResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };

export function createTradeService(
  repository: TradeRepository
) {
  return {
    async getAll(): Promise<ServiceResult<Trade[]>> {
      try {
        const trades =
          await repository.getAll();

        return {
          success: true,
          data: trades,
        };
      } catch {
        return {
          success: false,
          error: "Failed to load trades",
        };
      }
    },
  };
}