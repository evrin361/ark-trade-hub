import type { EntityId } from "@/contracts/persistence";

import type { PortfolioRepository } from "../repositories/portfolio.repository";
import type { Portfolio } from "../types/portfolio";

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
    async getAll(): Promise<
      ServiceResult<Portfolio[]>
    > {
      try {
        const portfolios =
          await repository.getAll();

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

    async getEnabled(): Promise<
      ServiceResult<Portfolio[]>
    > {
      const result =
        await this.getAll();

      if (!result.success) {
        return result;
      }

      return {
        success: true,
        data: result.data.filter(
          (portfolio) =>
            portfolio.enabled &&
            !portfolio.archived
        ),
      };
    },

    async getById(
      id: EntityId
    ): Promise<ServiceResult<Portfolio>> {
      try {
        const portfolio =
          await repository.getById(id);

        if (!portfolio) {
          return {
            success: false,
            error: "Portfolio not found",
          };
        }

        return {
          success: true,
          data: portfolio,
        };
      } catch {
        return {
          success: false,
          error: "Failed to get portfolio",
        };
      }
    },

    async create(
      data: {
        customerId: EntityId;
        name: string;
        code: string;
      }
    ): Promise<ServiceResult<Portfolio>> {
      try {
        const now = new Date();

        const newPortfolio: Portfolio = {
          id: {
            value: crypto.randomUUID(),
          },

          customerId: data.customerId,

          name: data.name,

          code: data.code,

          enabled: true,

          archived: false,

          createdAt: now,

          updatedAt: now,
        };

        const portfolio =
          await repository.create(
            newPortfolio
          );

        return {
          success: true,
          data: portfolio,
        };
      } catch {
        return {
          success: false,
          error: "Failed to create portfolio",
        };
      }
    },

    async update(
      id: EntityId,
      data: {
        name: string;
        code: string;
      }
    ): Promise<ServiceResult<Portfolio>> {
      try {
        const existingPortfolio =
          await repository.getById(id);

        if (!existingPortfolio) {
          return {
            success: false,
            error: "Portfolio not found",
          };
        }

        const updatedPortfolio: Portfolio = {
          ...existingPortfolio,

          name: data.name,

          code: data.code,

          updatedAt: new Date(),
        };

        const updated =
          await repository.update(
            updatedPortfolio
          );

        return {
          success: true,
          data: updated,
        };
      } catch {
        return {
          success: false,
          error: "Failed to update portfolio",
        };
      }
    },

    async delete(
      id: EntityId
    ): Promise<ServiceResult<void>> {
      try {
        await repository.delete(id);

        return {
          success: true,
          data: undefined,
        };
      } catch {
        return {
          success: false,
          error: "Failed to delete portfolio",
        };
      }
    },

    async archive(
      id: EntityId
    ): Promise<ServiceResult<Portfolio>> {
      try {
        const portfolio =
          await repository.getById(id);

        if (!portfolio) {
          return {
            success: false,
            error: "Portfolio not found",
          };
        }

        const updatedPortfolio: Portfolio = {
          ...portfolio,

          archived: true,

          enabled: false,

          updatedAt: new Date(),
        };

        const updated =
          await repository.update(
            updatedPortfolio
          );

        return {
          success: true,
          data: updated,
        };
      } catch {
        return {
          success: false,
          error: "Failed to archive portfolio",
        };
      }
    },

    async restore(
      id: EntityId
    ): Promise<ServiceResult<Portfolio>> {
      try {
        const portfolio =
          await repository.getById(id);

        if (!portfolio) {
          return {
            success: false,
            error: "Portfolio not found",
          };
        }

        const updatedPortfolio: Portfolio = {
          ...portfolio,

          archived: false,

          updatedAt: new Date(),
        };

        const updated =
          await repository.update(
            updatedPortfolio
          );

        return {
          success: true,
          data: updated,
        };
      } catch {
        return {
          success: false,
          error: "Failed to restore portfolio",
        };
      }
    },

    async toggleStatus(
      id: EntityId
    ): Promise<ServiceResult<Portfolio>> {
      try {
        const portfolio =
          await repository.getById(id);

        if (!portfolio) {
          return {
            success: false,
            error: "Portfolio not found",
          };
        }

        const updatedPortfolio: Portfolio = {
          ...portfolio,

          enabled: !portfolio.enabled,

          updatedAt: new Date(),
        };

        const updated =
          await repository.update(
            updatedPortfolio
          );

        return {
          success: true,
          data: updated,
        };
      } catch {
        return {
          success: false,
          error: "Failed to toggle portfolio status",
        };
      }
    },

    async refresh(): Promise<
      ServiceResult<Portfolio[]>
    > {
      return this.getAll();
    },
  };
}