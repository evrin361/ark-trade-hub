import type { EntityId } from "@/contracts/persistence";
import type { Portfolio } from "@/features/portfolio";

import { createPortfolioService } from "@/features/portfolio/services/portfolio.service";
import { portfolioRepository } from "@/features/portfolio/repositories/portfolio.repository.instance";

export type GetPortfolioResult =
  | {
      success: true;
      data: Portfolio;
    }
  | {
      success: false;
      error: string;
    };

export function createGetPortfolioUseCase() {
  const service =
    createPortfolioService(
      portfolioRepository
    );

  return {
    async execute(
      id: EntityId
    ): Promise<GetPortfolioResult> {
      return service.getById(id);
    },
  };
}