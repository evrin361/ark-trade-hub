import type { EntityId } from "@/contracts/persistence";
import type { Portfolio } from "@/features/portfolio";

import { createPortfolioService } from "@/features/portfolio/services/portfolio.service";
import { portfolioRepository } from "@/features/portfolio/repositories/portfolio.repository.instance";

export type CreatePortfolioInput = {
  customerId: EntityId;
  name: string;
  code: string;
};

export type CreatePortfolioResult =
  | {
      success: true;
      data: Portfolio;
    }
  | {
      success: false;
      error: string;
    };

export function createPortfolioUseCase() {
  const service =
    createPortfolioService(
      portfolioRepository
    );

  return {
    async execute(
      input: CreatePortfolioInput
    ): Promise<CreatePortfolioResult> {
      return service.create(input);
    },
  };
}