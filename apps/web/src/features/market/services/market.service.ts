import type { Market } from "../types/market";
import type { MarketRepository } from "../repositories/market.repository";

type ServiceResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };

export function createMarketService(
  repository: MarketRepository
) {
  return {
    async getAll(): Promise<ServiceResult<Market[]>> {
      try {
        const markets = await repository.getAll();

        return {
          success: true,
          data: markets,
        };
      } catch {
        return {
          success: false,
          error: "Failed to load markets",
        };
      }
    },
  };
}