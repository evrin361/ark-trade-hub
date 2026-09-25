import type { EntityId } from "@/contracts/persistence";

import type { Portfolio } from "../types/portfolio";
import type { PortfolioRepository } from "./portfolio.repository";

import type { PortfolioRepository as InfrastructurePortfolioRepository } from "@/infrastructure/persistence/repositories/portfolio/portfolio-repository";

export class PortfolioRepositoryImpl
  implements PortfolioRepository
{
  constructor(
    private readonly repository: InfrastructurePortfolioRepository
  ) {}

  async getAll(): Promise<Portfolio[]> {
    const result =
      await this.repository.getAll();

    if (!result.success) {
      throw new Error(result.error.message);
    }

    return result.data;
  }

  async getById(
    id: EntityId
  ): Promise<Portfolio | undefined> {
    const result =
      await this.repository.getById(id);

    if (!result.success) {
      throw new Error(result.error.message);
    }

    return result.data;
  }

  async create(
    portfolio: Portfolio
  ): Promise<Portfolio> {
    const result =
      await this.repository.create(portfolio);

    if (!result.success) {
      throw new Error(result.error.message);
    }

    return result.data;
  }

  async update(
    portfolio: Portfolio
  ): Promise<Portfolio> {
    const result =
      await this.repository.update(portfolio);

    if (!result.success) {
      throw new Error(result.error.message);
    }

    return result.data;
  }

  async delete(
    id: EntityId
  ): Promise<void> {
    const result =
      await this.repository.delete(id);

    if (!result.success) {
      throw new Error(result.error.message);
    }
  }
}