import type {
  CollectionResult,
  EntityId,
  PersistenceError,
  Result,
} from "@/contracts/persistence";

import type { Portfolio } from "@/features/portfolio/types/portfolio";

import type { PortfolioRepository } from "./portfolio-repository";

export class PortfolioRepositoryImpl
  implements PortfolioRepository
{
  private portfolios: Portfolio[] = [];

  async getAll(): Promise<
    CollectionResult<
      Portfolio,
      PersistenceError
    >
  > {
    return {
      success: true,
      data: [...this.portfolios],
    };
  }

  async getById(
    id: EntityId
  ): Promise<
    Result<
      Portfolio | undefined,
      PersistenceError
    >
  > {
    return {
      success: true,
      data: this.portfolios.find(
        (portfolio) =>
          portfolio.id.value === id.value
      ),
    };
  }

  async create(
    portfolio: Portfolio
  ): Promise<
    Result<
      Portfolio,
      PersistenceError
    >
  > {
    this.portfolios.push(portfolio);

    return {
      success: true,
      data: portfolio,
    };
  }

  async update(
    portfolio: Portfolio
  ): Promise<
    Result<
      Portfolio,
      PersistenceError
    >
  > {
    const index =
      this.portfolios.findIndex(
        (current) =>
          current.id.value ===
          portfolio.id.value
      );

    if (index >= 0) {
      this.portfolios[index] = portfolio;
    }

    return {
      success: true,
      data: portfolio,
    };
  }

  async delete(
    id: EntityId
  ): Promise<
    Result<
      void,
      PersistenceError
    >
  > {
    this.portfolios =
      this.portfolios.filter(
        (portfolio) =>
          portfolio.id.value !== id.value
      );

    return {
      success: true,
      data: undefined,
    };
  }
}