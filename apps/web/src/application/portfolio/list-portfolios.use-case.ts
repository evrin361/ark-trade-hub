import type { Portfolio } from "@/features/portfolio";
import { createPortfolioService } from "@/features/portfolio/services/portfolio.service";
import { portfolioRepository } from "@/features/portfolio/repositories/portfolio.repository.instance";

export type ListPortfoliosResult =
  | { success: true; data: Portfolio[] }
  | { success: false; error: string };

export function createListPortfoliosUseCase() {
  const service = createPortfolioService(portfolioRepository);

  return {
    async execute(): Promise<ListPortfoliosResult> {
      return service.getAll();
    },
  };
}
