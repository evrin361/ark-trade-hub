import type { Portfolio } from "../types/portfolio";
import type { PortfolioRepository } from "../repositories/portfolio.repository";

type ServiceResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };

export function createPortfolioService(
  repository: PortfolioRepository
) {
  return {
    async getAll(): Promise<ServiceResult<Portfolio[]>> {
      try {
        const portfolios = await repository.getAll();

        return {
          success: true,
          data: portfolios,
        };
      } catch {
        return {
          success: false,
          error: "Failed to load portfolios",
        };
      }
    },
  };
}