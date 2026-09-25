import { PortfolioRepositoryImpl } from "./portfolio.repository.impl";

import { PortfolioRepositoryImpl as InfrastructurePortfolioRepositoryImpl } from "@/infrastructure/persistence/repositories/portfolio/portfolio-repository.impl";

import type { PortfolioRepository } from "./portfolio.repository";

export const portfolioRepository: PortfolioRepository =
  new PortfolioRepositoryImpl(
    new InfrastructurePortfolioRepositoryImpl()
  );